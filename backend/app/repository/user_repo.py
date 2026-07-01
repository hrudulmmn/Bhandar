from sqlalchemy.orm import Session
from app.database.models import User
from app.database.schema import UserCreate

def create_user(db:Session,user:UserCreate,hashed_password:str)->User:
    db_user = User(
        name = user.name,
        email = user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db:Session,email:str)->User|None:
    return(db.query(User).filter(User.email==email).first())

def get_user_by_id(db:Session,id:int)->User|None:
    return(db.query(User).filter(User.id==id).first())

def delete_user(db:Session,user:User):
    db.delete(user)
    db.commit()