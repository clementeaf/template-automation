# Backend Serverless AWS

Este proyecto implementa una arquitectura serverless completa utilizando AWS y el Framework Serverless. Proporciona una API REST con operaciones CRUD para gestión de datos, almacenamiento de archivos y envío de correos electrónicos, todo ello desplegado como funciones Lambda en AWS.

## Servicios AWS utilizados

- **AWS Lambda** - Ejecución de código sin servidor
- **API Gateway** - Endpoints RESTful
- **DynamoDB** - Base de datos NoSQL
- **S3** - Almacenamiento de objetos
- **SES** - Servicio de envío de emails

## Características

- ✅ **TypeScript** - Código tipado, mantenible y seguro
- ✅ **AWS SDK v3** - Versión modular y optimizada del SDK de AWS
- ✅ **Serverless Framework** - Infraestructura como código (IaC)
- ✅ **IAM optimizado** - Permisos de mínimo privilegio
- ✅ **API RESTful** - Endpoints bien estructurados
- ✅ **Documentación** - API completamente documentada
- ✅ **Desarrollo local** - Entorno de pruebas con serverless-offline

## Requisitos previos

- **Node.js** v14.x o superior
- **AWS CLI** configurado con credenciales y perfil por defecto
- **Cuenta AWS** con permisos para crear los recursos necesarios
- **Serverless Framework** (instalación opcional, se puede usar con npx)

## Guía de inicio rápido

### Instalación

```bash
# Clonar repositorio
git clone <url-repositorio>
cd backend-node

# Instalar dependencias
npm install
```

### Desarrollo local

```bash
# Iniciar servidor local para desarrollo
npm run dev

# O para más control
npm run build
npm run start
```

### Despliegue a AWS

```bash
# Despliegue a entorno de desarrollo
npm run deploy

# Despliegue a producción
npm run deploy:prod
```

## Estructura del proyecto

```
backend-node/
├── dist/                   # Código compilado (generado)
├── src/
│   ├── handlers/           # Funciones Lambda
│   │   ├── dynamodb-handlers.ts  # Operaciones CRUD
│   │   ├── s3-handlers.ts        # Gestión de archivos
│   │   └── email-handlers.ts     # Envío de emails
│   ├── lib/                # Utilidades compartidas
│   └── models/             # Interfaces y tipos
├── serverless.yml          # Configuración de Serverless
├── package.json            # Dependencias y scripts
├── tsconfig.json           # Configuración TypeScript
└── README.md               # Documentación
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run build` | Compila el código TypeScript a JavaScript |
| `npm run start` | Inicia el servidor local con serverless-offline |
| `npm run dev` | Modo desarrollo con recarga automática |
| `npm run deploy` | Compilar y desplegar a AWS (dev) |
| `npm run deploy:prod` | Compilar y desplegar a AWS (prod) |
| `npm run deploy:quick` | Despliegue rápido de una sola función |
| `npm run deploy:package` | Crear paquete sin desplegar |
| `npm run remove` | Eliminar stack de AWS (dev) |
| `npm run remove:prod` | Eliminar stack de AWS (prod) |
| `npm run logs -f <función>` | Ver logs de una función específica |
| `npm run logs:tail -f <función>` | Ver logs en tiempo real |

## API REST

### Endpoints para DynamoDB

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/items` | Crear nuevo item |
| GET | `/items` | Listar todos los items |
| GET | `/items/{id}` | Obtener item por ID |
| PUT | `/items/{id}` | Actualizar item |
| DELETE | `/items/{id}` | Eliminar item |

#### Ejemplo de creación de item

```bash
curl -X POST https://[api-id].execute-api.[region].amazonaws.com/dev/items \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Ejemplo",
    "description": "Descripción del item",
    "active": true
  }'
```

#### Respuesta

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Ejemplo",
  "description": "Descripción del item",
  "active": true,
  "createdAt": "2023-01-01T12:00:00Z",
  "updatedAt": "2023-01-01T12:00:00Z"
}
```

### Endpoints para S3

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/upload` | Subir archivo a S3 |
| GET | `/files/{fileId}` | Obtener archivo (URL firmada) |

#### Ejemplo de subida de archivo

```bash
# Subida directa de archivo
curl -X POST https://[api-id].execute-api.[region].amazonaws.com/dev/upload \
  -H 'Content-Type: application/octet-stream' \
  --data-binary '@/ruta/archivo.pdf'

# Subida como JSON con base64
curl -X POST https://[api-id].execute-api.[region].amazonaws.com/dev/upload \
  -H 'Content-Type: application/json' \
  -d '{
    "file": "base64EncodedString...",
    "contentType": "application/pdf"
  }'
```

### Endpoints para SES

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/email` | Enviar email |

#### Ejemplo de envío de email

```bash
curl -X POST https://[api-id].execute-api.[region].amazonaws.com/dev/email \
  -H 'Content-Type: application/json' \
  -d '{
    "to": "destinatario@ejemplo.com",
    "subject": "Asunto del correo",
    "body": "Contenido del correo...",
    "isHtml": false,
    "cc": ["copia@ejemplo.com"],
    "bcc": ["copiaoculta@ejemplo.com"],
    "replyTo": "responder@ejemplo.com"
  }'
```

## Personalización de la configuración

### Variables de entorno

En el archivo `serverless.yml` puedes configurar las siguientes variables:

```yaml
environment:
  NODE_ENV: ${opt:stage, 'dev'}
  DYNAMODB_TABLE: ${self:service}-${self:provider.stage}
  BUCKET_NAME: ${self:service}-${self:provider.stage}-bucket
  SOURCE_EMAIL: no-reply@ejemplo.com
```

### Capacidad de DynamoDB

Por defecto, DynamoDB está configurado en modo bajo demanda (PAY_PER_REQUEST). Si prefieres modo aprovisionado:

```yaml
resources:
  Resources:
    ItemsTable:
      Properties:
        BillingMode: PROVISIONED
        ProvisionedThroughput:
          ReadCapacityUnits: 5
          WriteCapacityUnits: 5
```

## Mejores prácticas implementadas

- **Seguridad**: IAM con mínimo privilegio, restricción de acceso por recurso
- **Rendimiento**: Manejo eficiente de conexiones en Lambda
- **Costos**: Configuración optimizada para minimizar costos en AWS
- **Mantenibilidad**: Código modular y tipado con TypeScript
- **Operación**: Scripts para monitoreo y gestión de despliegues

## Consideraciones para producción

1. **Verificar direcciones de email en SES**: Para entornos de producción, verifica las direcciones de email en SES o solicita la eliminación del sandbox.

2. **CORS**: Configura correctamente los headers CORS si se integrará con un frontend.

3. **Monitoreo**: Configura alarmas en CloudWatch para métricas clave.

4. **Backups**: Considera activar point-in-time recovery para DynamoDB.

5. **Caché**: Implementa una estrategia de caché con API Gateway o CloudFront.

## Solución de problemas

### Error "Cannot find module"
Si aparece este error durante el despliegue, asegúrate de haber ejecutado `npm run build` antes de desplegar.

### Error de permisos
Verifica que tu usuario AWS tenga los permisos necesarios en IAM para crear todos los recursos.

### Tamaño del paquete
Si las funciones Lambda son muy grandes, considera optimizar las dependencias o usar webpack/esbuild.

## Licencia

ISC 