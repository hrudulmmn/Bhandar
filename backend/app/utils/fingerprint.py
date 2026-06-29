import hashlib

from app.database.schema import TransactionCreate


def generate_fingerprint(
    user_id: int,
    transaction: TransactionCreate
) -> str:
    """
    Generate a deterministic fingerprint for a transaction.
    """

    merchant = transaction.merchant.strip().upper()

    upi_ref = (
        transaction.upi_ref_no.strip()
        if transaction.upi_ref_no
        else ""
    )

    fingerprint = (
        f"{user_id}|"
        f"{transaction.amount:.2f}|"
        f"{merchant}|"
        f"{transaction.transaction_time.isoformat()}|"
        f"{upi_ref}"
    )

    return hashlib.sha256(
        fingerprint.encode("utf-8")
    ).hexdigest()