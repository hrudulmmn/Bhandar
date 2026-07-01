from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db

from app.database.models import User

from app.database.schema import (
    TransactionCreate,
    TransactionResponse,
    DashboardResponse,
    MessageResponse
)

from app.dependency import get_current_user

from app.services.trans_service import (
    create_trans,
    get_trans,
    get_all_trans,
    get_recent_trans,
    dele_trans,
    get_dashboard,
)

trans_router = APIRouter(prefix="/transactions",tags=["Trasnaction based"])

@trans_router.post("/",response_model=TransactionResponse)
def crea_trans(trans:TransactionCreate,user:User = Depends(get_current_user),db:Session = Depends(get_db)):
    return create_trans(db,user,trans)

@trans_router.get("/",response_model=list[TransactionResponse])
def all_trans(curr:User = Depends(get_current_user),db:Session = Depends(get_db)):
    return get_all_trans(db,curr)

@trans_router.get("/recent",response_model=list[TransactionResponse])
def getrecent_trans(curr:User = Depends(get_current_user),db:Session = Depends(get_db)):
    return get_recent_trans(db,curr)

@trans_router.get("/dashboard",response_model=DashboardResponse)
def get_dash(curr:User = Depends(get_current_user),db:Session = Depends(get_db)):
    return get_dashboard(db,curr)

@trans_router.get("/{trans_id}",response_model=TransactionResponse)
def getid_trans(trans_id:int,curr:User = Depends(get_current_user),db:Session=Depends(get_db)):
    return get_trans(db,curr,trans_id)

@trans_router.delete("/{trans_id}",response_model=MessageResponse)
def delete_trans(trans_id:int,curr:User=Depends(get_current_user),db:Session=Depends(get_db)):
    return dele_trans(db,curr,trans_id)