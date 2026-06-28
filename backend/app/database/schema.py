from datetime import datetime
from pydantic import BaseModel,EmailStr,ConfigDict
from backend.app.database.enums import Transactiontype

class UserCreate(BaseModel):
    name:str
    email:EmailStr
    password:str

class UserLogin(BaseModel):
    email:str
    password:str

class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id:int
    name:str
    email:EmailStr

class TransactionCreate(BaseModel):
    amount:float
    merchant:str
    transaction_type:Transactiontype
    transaction_time:datetime

    bank:str
    account_last4:str

    upi_ref_no:str | None = None
    payment_app:str | None = None

class TransactionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id:int
    amount:float
    merchant:str
    transaction_type:Transactiontype
    transaction_time:datetime
    created_at:datetime

    bank:str
    account_last4:str

    upi_ref_no:str | None
    payment_app:str | None
    category:str | None
