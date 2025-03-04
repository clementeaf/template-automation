import os
import json
import random
from typing import Dict, List, Any, Optional
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

class OpenAIService:
    """
    Servicio para interactuar con OpenAI API o simular su comportamiento.
    """
    
    def __init__(self, use_mock: bool = True):
        """
        Inicializa el servicio de OpenAI.
        
        Args:
            use_mock: Si es True, usa respuestas simuladas en lugar de llamar a la API de OpenAI.
        """
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.use_mock = use_mock or not self.api_key
        
        # Respuestas predefinidas para la simulación
        self._mock_responses = [
            "Basado en la información proporcionada, puedo sugerir lo siguiente...",
            "He analizado tu consulta y creo que la mejor respuesta es...",
            "Interesante pregunta. Desde mi perspectiva, recomendaría...",
            "Considerando todos los factores, mi análisis indica que...",
            "Gracias por tu pregunta. La solución óptima sería..."
        ]
        
        # Contexto simulado
        self._conversation_context = []
    
    async def generate_text(self, prompt: str, max_tokens: int = 150) -> Dict[str, Any]:
        """
        Genera texto utilizando OpenAI o simula la respuesta.
        
        Args:
            prompt: El texto de entrada para generar una respuesta.
            max_tokens: Número máximo de tokens a generar.
            
        Returns:
            Un diccionario con la respuesta y metadatos.
        """
        # Guardar en el contexto
        self._conversation_context.append({"role": "user", "content": prompt})
        
        if self.use_mock:
            return await self._mock_generate_text(prompt, max_tokens)
        else:
            return await self._real_generate_text(prompt, max_tokens)
    
    async def _mock_generate_text(self, prompt: str, max_tokens: int) -> Dict[str, Any]:
        """
        Simula una respuesta de OpenAI.
        """
        # Generar una respuesta aleatoria basada en palabras clave
        base_response = random.choice(self._mock_responses)
        
        # Personalizar respuesta basada en palabras clave en el prompt
        if "automatización" in prompt.lower():
            response = f"{base_response} Para la automatización mencionada, podrías utilizar herramientas como Python scripts, cron jobs o servicios como Zapier."
        elif "análisis" in prompt.lower() or "datos" in prompt.lower():
            response = f"{base_response} Para el análisis de datos, recomendaría utilizar pandas para manipulación y matplotlib o seaborn para visualización."
        elif "aprendizaje" in prompt.lower() or "machine learning" in prompt.lower():
            response = f"{base_response} Para este problema de machine learning, considera usar algoritmos como regresión, árboles de decisión o redes neuronales dependiendo de la complejidad."
        elif "recomendación" in prompt.lower():
            response = f"{base_response} Un sistema de recomendación efectivo podría basarse en filtrado colaborativo o basado en contenido."
        else:
            response = f"{base_response} {prompt.split()[0]} es un tema interesante que puede abordarse desde múltiples perspectivas."
        
        # Simular número de tokens
        tokens_used = len(response.split())
        
        # Limitar a max_tokens
        if tokens_used > max_tokens:
            response_words = response.split()[:max_tokens]
            response = " ".join(response_words) + "..."
            tokens_used = len(response_words)
        
        # Guardar en el contexto
        self._conversation_context.append({"role": "assistant", "content": response})
        
        return {
            "text": response,
            "tokens_used": tokens_used,
            "model": "gpt-3.5-turbo-simulated",
            "conversation_context": self._conversation_context.copy()
        }
    
    async def _real_generate_text(self, prompt: str, max_tokens: int) -> Dict[str, Any]:
        """
        Realiza una llamada real a la API de OpenAI.
        En un entorno real, aquí se implementaría la llamada a la API.
        """
        try:
            # Aquí iría el código para llamar a la API real de OpenAI
            # Por ejemplo:
            """
            import openai
            openai.api_key = self.api_key
            
            messages = self._conversation_context.copy()
            
            response = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=max_tokens,
                n=1,
                temperature=0.7,
            )
            
            # Procesar la respuesta
            response_text = response.choices[0].message.content
            tokens_used = response.usage.total_tokens
            
            # Guardar en el contexto
            self._conversation_context.append({"role": "assistant", "content": response_text})
            
            return {
                "text": response_text,
                "tokens_used": tokens_used,
                "model": response.model,
                "conversation_context": self._conversation_context.copy()
            }
            """
            
            # Por ahora, usar la simulación
            return await self._mock_generate_text(prompt, max_tokens)
        except Exception as e:
            # En caso de error, también usar simulación
            print(f"Error al llamar a OpenAI API: {str(e)}")
            return await self._mock_generate_text(prompt, max_tokens)

# Servicio singleton para uso en toda la aplicación
ai_service = OpenAIService() 