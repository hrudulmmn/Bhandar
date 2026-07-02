from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends,HTTPException,status
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.database.models import User

from app.services.auth import jwt_decode
from app.repository.user_repo import get_user_by_id

oauth = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token:str=Depends(oauth),db:Session=Depends(get_db))->User:
    payload = jwt_decode(token)
    print("Received token:", token)
    print("Payload:", payload)
    
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invali or expired Token"
        )
    
    userid = int(payload["sub"])
    user = get_user_by_id(db,userid)
    print("User ID:", userid)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User Not Found!"
        )
    print("User:", user)
    
    return user
