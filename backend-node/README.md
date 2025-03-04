# Backend Serverless AWS

Este es un template de backend serverless utilizando el Framework Serverless para despliegue en AWS. Proporciona una arquitectura sin servidor que utiliza:

- **AWS Lambda** para la ejecución de código
- **API Gateway** para endpoints REST
- **DynamoDB** para almacenamiento de datos
- **S3** para almacenamiento de archivos
- **SES** para envío de correos electrónicos

## Características

- ✅ **TypeScript** para tipado estático y mejores prácticas de desarrollo
- ✅ **Serverless Framework** para gestión de infraestructura como código
- ✅ **AWS SDK** para interactuar con servicios de AWS
- ✅ **Configuración IAM** precisa con permisos mínimos requeridos
- ✅ **Serverless Offline** para desarrollo y pruebas locales
- ✅ **API RESTful** para CRUD de items en DynamoDB
- ✅ **Gestión de archivos** con S3
- ✅ **Envío de emails** con SES

## Requisitos previos

- Node.js 14.x o superior
- AWS CLI configurado con credenciales
- Cuenta AWS con permisos adecuados
- Serverless Framework instalado globalmente (opcional)

## Estructura del proyecto

```
.
├── serverless.yml       # Configuración de Serverless Framework
├── package.json         # Dependencias y scripts
├── tsconfig.json        # Configuración de TypeScript
├── src/
│   ├── handlers/        # Funciones Lambda (handlers)
│   │   ├── s3-handlers.ts        # Operaciones con S3
│   │   ├── dynamodb-handlers.ts  # Operaciones con DynamoDB  
│   │   └── email-handlers.ts     # Operaciones con SES
│   ├── lib/             # Utilidades y funciones comunes
│   └── models/          # Modelos de datos e interfaces
└── ...
```

## Inicio rápido

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar localmente:**
   ```bash
   npm run dev
   ```
   Esto iniciará un servidor local en `http://localhost:3000`.

3. **Desplegar en AWS:**
   ```bash
   npm run deploy
   ```

## Endpoints disponibles

### DynamoDB

- `POST /items` - Crear un nuevo item
- `GET /items` - Obtener todos los items
- `GET /items/{id}` - Obtener un item por ID
- `PUT /items/{id}` - Actualizar un item
- `DELETE /items/{id}` - Eliminar un item

### S3

- `POST /upload` - Subir un archivo a S3
- `GET /files/{fileId}` - Obtener un archivo de S3

### SES

- `POST /email` - Enviar un email

## Uso de los endpoints

### Crear un item (DynamoDB)

```bash
curl -X POST \
  http://localhost:3000/items \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Ejemplo",
    "description": "Este es un ejemplo",
    "active": true
  }'
```

### Subir un archivo (S3)

```bash
curl -X POST \
  http://localhost:3000/upload \
  -H 'Content-Type: application/octet-stream' \
  --data-binary '@/ruta/al/archivo.pdf'
```

### Enviar un email (SES)

```bash
curl -X POST \
  http://localhost:3000/email \
  -H 'Content-Type: application/json' \
  -d '{
    "to": "destinatario@ejemplo.com",
    "subject": "Asunto del correo",
    "body": "Contenido del correo...",
    "isHtml": false
  }'
```

## Scripts disponibles

- `npm run dev` - Inicia el servidor local
- `npm run deploy` - Despliega en AWS (entorno dev)
- `npm run deploy:prod` - Despliega en AWS (entorno prod)
- `npm run remove` - Elimina el stack de AWS
- `npm run logs -f nombreFuncion` - Muestra logs de una función específica

## Configuración

La configuración principal se encuentra en `serverless.yml`. Puedes modificar:

- Región de AWS
- Nombre del servicio
- Variables de entorno
- Configuración de recursos (DynamoDB, S3)
- Permisos IAM

## Despliegue y eliminación

### Desplegar en diferentes entornos

```bash
# Entorno de desarrollo (default)
npm run deploy

# Entorno de producción
npm run deploy:prod

# Entorno personalizado
serverless deploy --stage miEntorno
```

### Eliminar el stack

```bash
npm run remove
```

## Consideraciones de seguridad

- Las políticas IAM están configuradas con el principio de mínimo privilegio
- Se usa DynamoDB en modo de capacidad bajo demanda para optimizar costos
- Los buckets S3 tienen configuración CORS
- Se recomienda verificar los emails en SES antes de su uso en producción

## Licencia

ISC 