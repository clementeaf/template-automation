from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(
    title="FastAPI Backend",
    description="API para automatizaciones e integraciones con IA",
    version="0.1.0",
)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especifica los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos de datos
class Message(BaseModel):
    content: str

class AIResponse(BaseModel):
    response: str
    tokens_used: Optional[int] = None

# Rutas de la API
@app.get("/")
async def read_root():
    return {"message": "Bienvenido a la API de Backend con FastAPI"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/chat", response_model=AIResponse)
async def chat_with_ai(message: Message):
    try:
        # Aquí irá la integración con modelos de IA
        # Por ahora, devolvemos una respuesta simulada
        return AIResponse(
            response=f"Respuesta simulada a: {message.content}",
            tokens_used=len(message.content.split())
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/automation")
async def run_automation(request_data: dict):
    try:
        # Aquí irá la lógica de automatización
        # Por ahora, devolvemos una respuesta simulada
        task_type = request_data.get("task_type", "unknown")
        return {
            "status": "success", 
            "message": f"Tarea de automatización '{task_type}' iniciada correctamente",
            "task_id": "123456"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    # Ejecutar el servidor con uvicorn directamente desde este script
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 