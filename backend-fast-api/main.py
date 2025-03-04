from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uvicorn
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Importar el servicio de IA
from app.services import ai_service

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
    content: str = Field(..., description="Contenido del mensaje", min_length=1)
    max_tokens: Optional[int] = Field(150, description="Número máximo de tokens a generar", ge=10, le=500)

class AIResponse(BaseModel):
    response: str
    tokens_used: Optional[int] = None
    model: Optional[str] = None
    conversation_context: Optional[List[Dict[str, str]]] = None

# Rutas de la API
@app.get("/")
async def read_root():
    return {"message": "Bienvenido a la API de Backend con FastAPI"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/chat", response_model=AIResponse)
async def chat_with_ai(message: Message):
    """
    Endpoint para interactuar con modelos de IA.
    
    Este endpoint acepta un mensaje y lo procesa con un modelo de IA (OpenAI).
    Actualmente está configurado para funcionar con un simulador de respuestas,
    pero puede integrarse fácilmente con la API real de OpenAI configurando
    la variable de entorno OPENAI_API_KEY.
    
    - **content**: El mensaje o prompt a enviar al modelo de IA
    - **max_tokens**: Número máximo de tokens a generar en la respuesta
    
    Retorna la respuesta generada, el número de tokens utilizados y el modelo usado.
    """
    try:
        # Llamar al servicio de IA
        result = await ai_service.generate_text(message.content, message.max_tokens)
        
        # Construir la respuesta
        return AIResponse(
            response=result["text"],
            tokens_used=result["tokens_used"],
            model=result["model"],
            conversation_context=result["conversation_context"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/automation")
async def run_automation(
    task_type: str = Query(..., description="Tipo de tarea a ejecutar"),
    parameters: Optional[Dict[str, Any]] = None
):
    """
    Endpoint para ejecutar tareas de automatización.
    
    Este endpoint permite iniciar diferentes tipos de automatizaciones:
    - data_processing: Procesar y transformar datos
    - report_generation: Generar informes basados en datos
    - notification: Enviar notificaciones
    - integration: Integrarse con servicios externos
    
    - **task_type**: El tipo de tarea a ejecutar
    - **parameters**: Parámetros opcionales para la tarea
    """
    try:
        # Validar el tipo de tarea
        valid_task_types = ["data_processing", "report_generation", "notification", "integration"]
        if task_type not in valid_task_types:
            raise HTTPException(
                status_code=400, 
                detail=f"Tipo de tarea no válido. Debe ser uno de: {', '.join(valid_task_types)}"
            )
        
        # Aquí se implementaría la lógica para diferentes tareas
        # Por ahora, devolvemos una respuesta simulada
        response_messages = {
            "data_processing": "Procesamiento de datos iniciado. Los resultados estarán disponibles en breve.",
            "report_generation": "Generación de informe iniciada. Se enviará por correo cuando esté listo.",
            "notification": "Notificación enviada correctamente a todos los destinatarios.",
            "integration": "Integración con servicios externos completada con éxito."
        }
        
        return {
            "status": "success", 
            "message": response_messages[task_type],
            "task_id": "task-123456",
            "parameters": parameters or {}
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    # Ejecutar el servidor con uvicorn directamente desde este script
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True) 