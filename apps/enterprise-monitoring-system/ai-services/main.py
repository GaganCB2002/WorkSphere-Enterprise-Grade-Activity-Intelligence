from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import Routers
from violence_detection.router import router as violence_router
from productivity_prediction.router import router as productivity_router
from anomaly_detection.router import router as anomaly_router
from behavior_analysis.router import router as behavior_router
from face_recognition.router import router as face_router
from sentiment_analysis.router import router as sentiment_router
from tracking_analysis.router import router as tracking_router
from report_ai.router import router as report_router
from recommendation_engine.router import router as recommendation_router

app = FastAPI(
    title="WorkSphere AI Microservices Cluster",
    description="State-of-the-art AI inference cluster powering enterprise activity intelligence.",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(violence_router, prefix="/api/v1/ai/violence", tags=["Violence Detection"])
app.include_router(productivity_router, prefix="/api/v1/ai/productivity", tags=["Productivity Prediction"])
app.include_router(anomaly_router, prefix="/api/v1/ai/anomaly", tags=["Anomaly Detection"])
app.include_router(behavior_router, prefix="/api/v1/ai/behavior", tags=["Behavior Analysis"])
app.include_router(face_router, prefix="/api/v1/ai/face", tags=["Face Recognition"])
app.include_router(sentiment_router, prefix="/api/v1/ai/sentiment", tags=["Sentiment Analysis"])
app.include_router(tracking_router, prefix="/api/v1/ai/tracking", tags=["Tracking Analysis"])
app.include_router(report_router, prefix="/api/v1/ai/report", tags=["Report AI"])
app.include_router(recommendation_router, prefix="/api/v1/ai/recommendation", tags=["Recommendation Engine"])

@app.get("/health", tags=["Health Check"])
async def health_check():
    return {
        "status": "healthy",
        "cluster": "AI-Inference-Cluster-GPU-1",
        "active_models": 9
    }
