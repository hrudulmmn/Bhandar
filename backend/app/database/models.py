from sqlalchemy import Column,String,Integer,Float, ForeignKey,DateTime,Enum,Numeric
from sqlalchemy.orm import relationship
from backend.app.database.db import Base
from backend.app.database.enums import Transactiontype
from sqlalchemy.sql import func


class User(Base):
    __tablename__ = "users"

    id = Column(Integer,primary_key=True,index=True)
    name = Column(String,nullable=False)
    email = Column(String,unique=True,nullable=False,index=True)
    hashed_password = Column(String,nullable=False)
    transactions = relationship("Transaction",back_populates="user",cascade="all, delete-orphan")

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer,primary_key=True,index=True)
    user_id = Column(Integer,ForeignKey("users.id"),nullable=False)
    amount = Column(Numeric(10,2),nullable=False)
    merchant = Column(String,nullable=False)
    category = Column(String,default="Other",nullable=True)
    transaction_type = Column(Enum(Transactiontype),nullable=False)
    fingerprint = Column(String,unique=True,nullable=False,index=True)
    user = relationship("User",back_populates="transactions")
    transaction_time = Column(DateTime,nullable=False)
    created_at = Column(DateTime(timezone=True),server_default=func.now())
    payment_app = Column(String,nullable=True)
    upi_ref_no = Column(String, nullable=True, index=True)
    bank = Column(String,nullable=False)
    account_last4 = Column(String,nullable=False)