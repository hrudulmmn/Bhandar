from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.database.models import User
from app.database.schema import (
    UserCreate,
    UserLogin,
    TokenResponse,
    MessageResponse
)

from app.dependency import get_current_user

from app.services.user_service import (
    register_user,
    login_user,
    delete_user
)

auth_router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@auth_router.post("/register",response_model=TokenResponse)
def reg_user(
    user:UserCreate,
    db:Session = Depends(get_db)
):
    return register_user(user,db)

@auth_router.post("/login",response_model=TokenResponse)
def log_user(
    user:UserLogin,
    db:Session = Depends(get_db)
):
    return login_user(user,db)

@auth_router.delete("/me",response_model=MessageResponse)
def del_user(
    user:User = Depends(get_current_user),
    db:Session = Depends(get_db)
):
    return delete_user(user,db)

