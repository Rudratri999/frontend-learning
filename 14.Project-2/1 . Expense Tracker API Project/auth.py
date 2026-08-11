# hash_password()
# verify_password()
# create_access_token()
# get_current_user()
import secrets


from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status,Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from models import User
from database import get_db

from config import (
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)




def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password : str , hashed_password : str) -> bool:
    return pwd_context.verify(plain_password , hashed_password)


# def create_access_token(data : dict):
#     to_encode = data.copy()
#     enocded_jwt = jwt.encode(to_encode , SECRET_KEY , algorithm=ALGORITHM )
#     return enocded_jwt

def create_password_reset_token():
    token = secrets.token_urlsafe(32)

    expires_at = datetime.now(timezone.utc) + timedelta(minutes=15)

    return token, expires_at

def create_access_token(data : dict) -> str:

    to_encode = data.copy()

    now_utc = datetime.now(timezone.utc)
    expire_time = now_utc + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({
        "exp": int(expire_time.timestamp()),
    })

    encoded_jwt = jwt.encode(to_encode, 
                             SECRET_KEY, 
                             algorithm=ALGORITHM)
    return encoded_jwt


def create_refresh_token(data: dict) -> str:
    to_encode = data.copy()

    now_utc = datetime.now(timezone.utc)
    expire_time = now_utc + timedelta(days=7)

    to_encode.update({
        "exp": int(expire_time.timestamp()),
        "type": "refresh"
    })

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


def get_current_user(
    request:Request,
    db: Session = Depends(get_db)
):
    token = request.cookies.get("access_token")
    if not token:
            raise HTTPException(
                status_code=401,
                detail="Not authenticated"
            )
    
    try:
        payload = jwt.decode(
            token, 
            SECRET_KEY, 
            algorithms=[ALGORITHM]
            )
        
        username = payload.get("sub")

        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Token"
            )

        user = db.query(User).filter(User.username == username).first()
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Token"
            )

        return user

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Token"
        )


# --- Option B (commented) -------------------------------------------------
# Alternative `get_current_user` that accepts the token from either the
# `Authorization: Bearer <token>` header OR a cookie named `access_token`.
# Uncomment and replace the active `get_current_user` if you ever want cookie
# support for browser URL access.
#
# from fastapi import Request
#
# def get_current_user_via_cookie(
#     request: Request,
#     db: Session = Depends(get_db)
# ):
#     auth = request.headers.get("Authorization")
#     token = None
#     if auth and auth.startswith("Bearer "):
#         token = auth.split(" ", 1)[1]
#     else:
#         token = request.cookies.get("access_token")
#
#     if not token:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Not authenticated"
#         )
#
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username = payload.get("sub") or payload.get("username")
#
#         if username is None:
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail="Invalid Token"
#             )
#
#         user = db.query(User).filter(User.username == username).first()
#         if user is None:
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail="Invalid Token"
#             )
#
#         return user
#
#     except JWTError:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid Token"
#         )
