from fastapi import Depends,HTTPException,status
from sqlalchemy.orm import Session

from app.database.schema import UserCreate,UserLogin,UserResponse,TokenResponse
from app.database.models import User
from app.services.auth import hash_password,verify_password,generate_token
from app.repository.user_repo import create_user,delete_user,get_user_by_email

def register_user(user:UserCreate,db:Session)->TokenResponse:
    if get_user_by_email(db,user.email) is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already Exists!"
        )
    
    hashed = hash_password(user.password)

    newuser = create_user(db,user,hashed)

    token =  generate_token({"sub":str(newuser.id)})
    return TokenResponse(
        access_token=token,
        token_type="bearer"
    )
    

def login_user(user:UserLogin,db:Session)->TokenResponse:
    currUser = get_user_by_email(db,user.email)
    if currUser is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Email or password"
        )
    
    if not verify_password(user.password,currUser.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Email or password"
        )
    
    token = generate_token({"sub":str(currUser.id)})

    return TokenResponse(
        access_token=token,
        token_type="bearer"
    )

    def delete_user(user:User,db:Session):
        delete_user(db,user)
        return {
            "message":"User Deleted Successfully!"
        }