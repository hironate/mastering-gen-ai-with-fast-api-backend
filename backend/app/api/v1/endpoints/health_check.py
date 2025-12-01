from fastapi import APIRouter, Response, HTTPException

router = APIRouter()

@router.get("")
async def health_check(response: Response):
    return {"status": "healthy"}

@router.get("/error")
async def health_check_error(response: Response):
    raise HTTPException(status_code=500, detail="System is experiencing issues")