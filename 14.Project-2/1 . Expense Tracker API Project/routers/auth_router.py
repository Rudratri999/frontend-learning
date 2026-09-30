# POST /register
# POST /login


from database import get_db
from fastapi import Request, Response
from models import User
from schemas import UserCreate, UserLogin, UserResponse, Token , ForgotPasswordRequest , ResetPasswordRequest
from fastapi import APIRouter, Depends, HTTPException , Response
from auth import get_current_user, require_role, hash_password, verify_password, create_access_token , create_refresh_token , create_password_reset_token
from sqlalchemy import or_
from jose import JWTError, jwt
from datetime import datetime, timezone
from redis_client import redis_client

router = APIRouter()
from config import (
    SECRET_KEY,
    ALGORITHM,
  
)

@router.post("/register", response_model=UserResponse)
def register(
    user : UserCreate,
    db = Depends(get_db)
):
    existing_user = db.query(User).filter(
        or_(User.username == user.username,
        User.email == user.email)).first()


    if existing_user :
        raise HTTPException(
            status_code=400,
            detail="User Alredy Exists"
        )
    

    new_user = User(
         username = user.username,
         password = hash_password(user.password),
         email  =  user.email
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

# Refresh Token
#       ↓
# jwt.decode()
#       ↓
# Is it valid?
#       ↓
# Is type == "refresh"?
#       ↓
# Get username from "sub"
#       ↓
# create_access_token()
#       ↓
# New Access Token

@router.post("/refresh")
def refresh_access_token(
    request: Request,
    response: Response
):
    refresh_token = request.cookies.get("refresh_token")

    if not refresh_token:
        raise HTTPException(
            status_code=401,
            detail="Refresh token not found"
        )

    try:
        payload = jwt.decode(
            refresh_token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        if payload.get("type") != "refresh":
            raise HTTPException(
                status_code=401,
                detail="Invalid refresh token"
            )

        username = payload.get("sub")

        if not username:
            raise HTTPException(
                status_code=401,
                detail="Invalid refresh token"
            )

        new_access_token = create_access_token(
            data={"sub": username}
        )

        response.set_cookie(
            key="access_token",
            value=new_access_token,
            httponly=True,
            samesite="lax",
            secure=False,
            max_age=3600,
        )

        return {
            "message": "Access token refreshed successfully"
        }

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired refresh token"
        )

# LOGIN
#   ↓
# Access Token → HttpOnly cookie
# Refresh Token → HttpOnly cookie
#   ↓
# Access token expires
#   ↓
# POST /refresh
#   ↓
# Backend reads refresh_token cookie
#   ↓
# Validates refresh token
#   ↓
# Creates new access token
#   ↓
# Updates access_token cookie

@router.post("/login", response_model=Token)
async def login(
    user: UserLogin,
    response: Response,
    request : Request,
    db = Depends(get_db)
):


    #  Taking the ip from nginx because request coming through nginx and ip is avail by nginx
    client_ip = request.headers.get("X-Real-IP")

    if not client_ip :
        client_ip = request.client.host

    # Redis key of IP
    key = f"login_attempts : {client_ip}"

    attempts = await redis_client.get(key)

    if attempts and int(attempts) >= 5 : 
        raise HTTPException(
            status_code=429,
            detail="Too many Login Attempts , Try After Some Times"
        )

    if not user.username :
        raise HTTPException(
            status_code=400,
            detail="Username  is required"
        )

    db_user = db.query(User).filter(
        User.username == user.username
            
    ).first()

    if db_user is None:
        # Counting the failed attempts
        attempts = await redis_client.incr(key)

        if attempts == 1 : 
            await redis_client.expire(key, 60)

        raise HTTPException(
            status_code=400,
            detail="Invalid credentials"
        )

    if not verify_password(user.password, db_user.password):

        attempts = await redis_client.incr(key)
        
        if attempts == 1 : 
             await redis_client.expire(key, 60)

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    access_token = create_access_token(
        data={"sub": db_user.username}
    )

    refresh_token = create_refresh_token(
    data={"sub": db_user.username}
    )

 
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        samesite="lax",
        secure=False,
        max_age=3600,
    )

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        samesite="lax",
        secure=False,
        max_age=7 * 24 * 60 * 60,
    )

    return {
    "access_token": access_token,
    "token_type": "bearer"
}

@router.post("/forgot-password")
def forgot_password(
    user: ForgotPasswordRequest,
    db=Depends(get_db)
):
    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if db_user is None:
        raise HTTPException(
            status_code=404,
            detail="User with this email does not exist"
        )

    reset_token, expires_at = create_password_reset_token()

    db_user.reset_token = reset_token
    db_user.reset_token_expires = expires_at

    db.commit()

    reset_link = (
        f"http://localhost:5173/reset-password?token={reset_token}"
    )

    return {
        "message": "Password reset link generated",
        "reset_link": reset_link
    }

@router.post("/reset-password")
def reset_password(
    data: ResetPasswordRequest,
    db=Depends(get_db)
):
    db_user = db.query(User).filter(
        User.reset_token == data.token
    ).first()

    if db_user is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired reset token"
        )

    if (
        db_user.reset_token_expires is None
        or db_user.reset_token_expires < datetime.now(timezone.utc)
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired reset token"
        )

    db_user.password = hash_password(data.new_password)

    # Invalidate token after successful password reset
    db_user.reset_token = None
    db_user.reset_token_expires = None

    db.commit()

    return {
        "message": "Password reset successfully"
    }




@router.get("/profile")
def profile(current_user = Depends(get_current_user)):
    return current_user


@router.post("/logout")
def logout(response: Response):

    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")

    return {
        "message": "Logged out successfully"
    }


@router.get("/admin/users")
def get_all_users(
    db = Depends(get_db),
    current_admin: User = Depends(require_role("admin"))
):
    return db.query(User).all()