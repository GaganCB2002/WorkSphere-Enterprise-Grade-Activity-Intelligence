from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from .service import FaceRecognitionService

router = APIRouter()
service = FaceRecognitionService()

class InferenceRequest(BaseModel):
    payload: dict
    timestamp: str
    source_id: str

@router.post("/verify")
async def run_inference(request: InferenceRequest):
    try:
        result = service.analyze(request.payload)
        return {
            "success": True,
            "timestamp": request.timestamp,
            "source_id": request.source_id,
            "inference": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
