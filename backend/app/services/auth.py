from datetime import datetime,timedelta,timezone
from typing import Optional
from jose import JWTError,jwt
from passlib.context import CryptContext
from backend.app.config import JWT_ALGORITHM,JWT_EXPIRE,JWT_TEMPLATE

pwd_context = CryptContext(schemes=["bcrypt"],deprecated="auto")

def hash_password(password:str)->str:
    return pwd_context.hash(password)

def verify_password(strpass:str,hashpass:str)->bool:
    return pwd_context.verify(strpass,hashpass)

def generate_token(data:dict,expires_delta:Optional[timedelta] = None)->str:
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc)+expires_delta
    else:
        expire = datetime.now(timezone.utc)+timedelta(minutes=JWT_EXPIRE)
    
    to_encode.update({"exp":expire})

    encoded_jwt = jwt.encode(
        to_encode,
        JWT_TEMPLATE,
        algorithm=JWT_ALGORITHM
    )

    return encoded_jwt

def jwt_decode(token:str)->Optional[dict]:
    try:
        payload = jwt.decode(
            token,JWT_TEMPLATE,
            algorithms=[JWT_ALGORITHM]
        )
        return payload
    except JWTError:
        return None
