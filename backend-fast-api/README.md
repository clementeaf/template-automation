# Backend FastAPI para Automatizaciones e IA

Un backend moderno construido con FastAPI, diseñado para automatizaciones e integración con modelos de Inteligencia Artificial.

## Características

- ✅ **FastAPI**: Framework moderno, rápido y con validación automática
- ✅ **Swagger UI**: Documentación interactiva de API
- ✅ **Integración con IA**: Preparado para conectar con OpenAI y otros modelos
- ✅ **Automatizaciones**: Endpoints para ejecutar tareas automatizadas
- ✅ **SQLAlchemy**: ORM para interacción con bases de datos
- ✅ **Alembic**: Migraciones de base de datos
- ✅ **Autenticación**: JWT para proteger endpoints
- ✅ **Testing**: Configuración con pytest
- ✅ **Dockerización**: Listo para contenedores (pendiente)

## Requisitos previos

- Python 3.9+
- pip (gestor de paquetes de Python)
- Virtualenv (recomendado)

## Configuración del entorno

1. Crea un entorno virtual:
```bash
python -m venv venv
```

2. Activa el entorno virtual:
```bash
# En Windows
venv\Scripts\activate

# En macOS/Linux
source venv/bin/activate
```

3. Instala las dependencias:
```bash
pip install -r requirements.txt
```

4. Configura las variables de entorno:
   - Copia el archivo `.env.example` a `.env`
   - Edita el archivo `.env` con tus configuraciones

## Uso

### Iniciar el servidor de desarrollo

```bash
uvicorn main:app --reload
```

La API estará disponible en `http://localhost:8000`. La documentación interactiva estará en `http://localhost:8000/docs`.

### Ejecutar los tests

```bash
pytest
```

## Estructura del proyecto

```
backend-fast-api/
├── .env                # Variables de entorno
├── .gitignore          # Archivos ignorados por Git
├── main.py             # Punto de entrada de la aplicación
├── requirements.txt    # Dependencias del proyecto
└── README.md           # Documentación
```

## Endpoints principales

- `GET /`: Ruta principal
- `GET /health`: Verificación de estado
- `POST /api/chat`: Interacción con IA
- `POST /api/automation`: Ejecución de automatizaciones

## Integración con IA

El endpoint `/api/chat` está preparado para integrar con modelos de OpenAI u otros proveedores de IA. Actualmente devuelve respuestas simuladas, pero puede expandirse según necesidades específicas.

## Automatizaciones

El endpoint `/api/automation` permite ejecutar tareas automatizadas, como procesar datos, generar informes o interactuar con servicios externos.

## Próximos pasos

- Implementar autenticación JWT
- Configurar conexión a base de datos
- Añadir Dockerfile
- Expandir las capacidades de IA
- Implementar tareas asíncronas con Celery

## Licencia

MIT 