from fastapi import FastAPI

app = FastAPI(title="WorkSphere AI Microservice", version="0.1.0")

@app.get("/api/v1/ai/health")
async def health_check():
    return {
        "service": "ai-service",
        "status": "UP",
        "port": 8085
    }
