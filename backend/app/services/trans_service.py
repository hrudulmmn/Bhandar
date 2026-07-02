from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.database.models import (
    User,
    Transaction,
)

from app.database.schema import (
    TransactionCreate, DashboardResponse,MessageResponse
)

from app.repository.transaction_repo import (
    create_transaction,
    get_transaction_by_id,
    get_all_transactions,
    get_recent_transactions,
    delete_transaction,
    transaction_exists,
)

from app.utils.fingerprint import generate_fingerprint


def create_trans(db:Session,curr:User,transaction:TransactionCreate):
    fingerprint = generate_fingerprint(int(curr.id),transaction)
    dup = transaction_exists(db,fingerprint)

    if dup:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Transaction already exists"
        )
    
    return create_transaction(db,transaction,int(curr.id),fingerprint)

def get_trans(db:Session,curr:User,trans_id:int):
    trans = get_transaction_by_id(db,trans_id)

    if not trans:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not Found!"
        )
    
    if curr.id != trans.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access Denied!"
        )
    
    return trans

def get_all_trans(db:Session,curr:User):
    all_trans = get_all_transactions(db,int(curr.id))
    
    return all_trans

def get_recent_trans(db:Session,curr:User):
    recent = get_recent_transactions(db,curr.id,10)
    return recent

def dele_trans(db:Session,curr:User,trans_id:int):
    trans = get_transaction_by_id(db,transaction_id=trans_id)

    if not trans:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found!"
        )
    
    if trans.user_id != curr.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access Denied!"
        )
    
    delete_transaction(db,trans)
    return MessageResponse(message="Transaction deleted successfully!")
    

def get_dashboard(db:Session,curr:User):
    trans = get_all_transactions(db,curr.id)

    if not trans:
        return DashboardResponse(
            total_credit=0.0,
            total_debit=0.0,
            transaction_count=0,
            recent_trans=[]
        )
    credit = 0
    debit = 0
    total = len(trans)

    for tran in trans:
        if tran.transaction_type == "DEBIT":
            debit+=tran.amount
        else:
            credit+=tran.amount
    
    return DashboardResponse(
        total_credit=credit,
        total_debit=debit,
        transaction_count=total,
        recent_trans=get_recent_trans(db,curr)
    )
