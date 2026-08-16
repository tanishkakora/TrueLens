from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from app.security import get_current_user
from app.crud import (
    create_user,
    get_user_by_email,
    get_user_by_id,
    get_total_predictions,
    get_fake_predictions,
    get_real_predictions
)
from app.security import verify_password, create_access_token
from fastapi import Depends

router = APIRouter()


class SignupRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


class SigninRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/signup")
async def signup(user: SignupRequest):

    created_user = await create_user(
        username=user.username,
        email=user.email,
        password=user.password
    )

    if created_user is None:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )

    return {
        "message": "Account created successfully."
    }


@router.post("/signin")
async def signin(user: SigninRequest):

    db_user = await get_user_by_email(user.email)

    if db_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    token = create_access_token(
        {
            "sub": str(db_user["_id"]),
            "email": db_user["email"]
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "username": db_user["username"]
    }

@router.get("/profile")
async def profile(
    user_id: str = Depends(get_current_user)
):
    user = await get_user_by_id(user_id)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    total = await get_total_predictions(user_id)
    fake = await get_fake_predictions(user_id)
    real = await get_real_predictions(user_id)

    return {
        "username": user["username"],
        "email": user["email"],
        "total_predictions": total,
        "fake_predictions": fake,
        "real_predictions": real
    }