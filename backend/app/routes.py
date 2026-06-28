from fastapi import APIRouter

router = APIRouter()

@router.get("/transactions")
def get_tansactions():
    return []
