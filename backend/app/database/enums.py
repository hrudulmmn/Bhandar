from enum import Enum as PyEnum

class Transactiontype(str,PyEnum):
    DEBIT = "DEBIT"
    CREDIT = "CREDIT"