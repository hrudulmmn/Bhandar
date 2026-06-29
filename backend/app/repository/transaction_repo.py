from sqlalchemy.orm import Session

from app.database.models import Transaction
from app.database.schema import TransactionCreate


def create_transaction(
    db: Session,
    transaction: TransactionCreate,
    user_id: int,
    fingerprint: str,
    category: str = "Other"
) -> Transaction:

    db_transaction = Transaction(
        user_id=user_id,
        amount=transaction.amount,
        merchant=transaction.merchant,
        category=category,
        transaction_type=transaction.transaction_type,
        fingerprint=fingerprint,
        transaction_time=transaction.transaction_time,
        payment_app=transaction.payment_app,
        upi_ref_no=transaction.upi_ref_no,
        bank=transaction.bank,
        account_last4=transaction.account_last4
    )

    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)

    return db_transaction


def get_transaction_by_id(
    db: Session,
    transaction_id: int
) -> Transaction | None:

    return (
        db.query(Transaction)
        .filter(Transaction.id == transaction_id)
        .first()
    )


def get_all_transactions(
    db: Session,
    user_id: int
):

    return (
        db.query(Transaction)
        .filter(Transaction.user_id == user_id)
        .order_by(Transaction.transaction_time.desc())
        .all()
    )


def get_recent_transactions(
    db: Session,
    user_id: int,
    limit: int = 5
):

    return (
        db.query(Transaction)
        .filter(Transaction.user_id == user_id)
        .order_by(Transaction.transaction_time.desc())
        .limit(limit)
        .all()
    )


def transaction_exists(
    db: Session,
    fingerprint: str
) -> bool:

    transaction = (
        db.query(Transaction)
        .filter(Transaction.fingerprint == fingerprint)
        .first()
    )

    return transaction is not None


def delete_transaction(
    db: Session,
    transaction: Transaction
):

    db.delete(transaction)
    db.commit()