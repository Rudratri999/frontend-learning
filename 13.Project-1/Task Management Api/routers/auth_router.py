from database import get_db

from models import User
from schemas import UserCreate, UserResponse
from fastapi import APIRouter, Depends, HTTPException, Response
from auth import (
    get_current_user,
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter()


@router.post("/register", response_model=UserResponse)
def register(
    user: UserCreate,
    db=Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User Alredy Exists"
        )

    new_user = User(
        username=user.username,
        password=hash_password(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login")
def login(
    user: UserCreate,
    response: Response,
    db=Depends(get_db)
):

    if not user.username:
        raise HTTPException(
            status_code=400,
            detail="username is required"
        )

    db_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if db_user is None:
        raise HTTPException(
            status_code=404,
            detail="Not Found"
        )

    if not verify_password(
        user.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=400,
            detail="Incorrect Password"
        )

    access_token = create_access_token(
        data={"sub": db_user.username}
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        samesite="lax",
        secure=False,     # Change to True in production (HTTPS)
        max_age=3600
    )

    return {
        "message": "Login Successful"
    }


@router.get("/me", response_model=UserResponse)
def get_current_user_info(
    current_user=Depends(get_current_user)
):

    return current_user


@router.post("/logout")
def logout(response: Response):

    response.delete_cookie("access_token")

    return {
        "message": "Logged out successfully"
    }