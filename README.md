# Sistema de Templates para Automatización de Proyectos

Este repositorio contiene plantillas de proyectos mínimos funcionales y herramientas para la automatización en la creación y gestión de proyectos de desarrollo. El objetivo es proporcionar un punto de partida rápido para diferentes tipos de proyectos, evitando la configuración repetitiva.

## Estructura del Repositorio

### Scripts y Herramientas

- **create-repo.sh**: Script para crear automáticamente un repositorio en GitHub llamado "template-automation" utilizando la API de GitHub.
- **scripts/**: Carpeta que contiene scripts útiles para la generación de código:
  - **create-component.js**: Genera componentes React/Next.js con estructura predefinida.
  - **create-page.js**: Genera páginas para aplicaciones Next.js con estructura predefinida.
- **.env**: Archivo de configuración para variables de entorno (contiene el token de GitHub).
- **.env.example**: Plantilla de ejemplo para el archivo .env.

### Templates de Proyectos

Este repositorio incluye los siguientes templates de proyectos, listos para usar:

- **frontend-nextjs/**: Proyecto moderno de Next.js configurado con:
  - TypeScript para tipado estático
  - ESLint y configuración moderna
  - TailwindCSS para estilos
  - Componentes reutilizables (Header, ThemeToggle)
  - React Query para gestión de estado y peticiones
  - Tema claro/oscuro con next-themes
  - Estructura de carpetas optimizada (app/, components/)
  - Responsive design

- **backend-node/**: Proyecto completo de backend serverless para AWS:
  - TypeScript para tipado estático
  - Serverless Framework para despliegue en AWS
  - API RESTful completa
  - AWS SDK v3 para interacción con servicios de AWS
  - Soporte para S3 (almacenamiento de archivos)
  - Soporte para DynamoDB (base de datos NoSQL)
  - Soporte para SES (envío de emails)
  - IAM optimizado con permisos de mínimo privilegio
  - Scripts para desarrollo local y despliegue

## Uso del Repositorio

### Crear un Nuevo Repositorio en GitHub

Para crear un nuevo repositorio en GitHub utilizando el script proporcionado:

```bash
# Asegúrate de tener un archivo .env con tu token de GitHub
echo "GITHUB_TOKEN=tu_token_de_github" > .env

# Ejecuta el script para crear el repositorio
./create-repo.sh
```

El script verificará que todas las dependencias estén instaladas, creará el repositorio en GitHub y te dará la opción de clonarlo inmediatamente.

### Utilizar un Template de Proyecto

Para iniciar un nuevo proyecto basado en uno de los templates disponibles:

```bash
# Copia el template deseado a tu directorio de trabajo
cp -r frontend-nextjs/ mi-proyecto-frontend
# o
cp -r backend-node/ mi-proyecto-backend

# Entra al directorio del proyecto e instala las dependencias
cd mi-proyecto-frontend
npm install
```

### Frontend Next.js

El template frontend-nextjs proporciona una aplicación Next.js moderna lista para usar:

```bash
# Iniciar el servidor de desarrollo
cd frontend-nextjs
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Backend Serverless

El template backend-node proporciona una aplicación serverless lista para desplegar en AWS:

```bash
# Desarrollo local
cd backend-node
npm install
npm run dev

# Despliegue a AWS
npm run deploy
```

Consulta el README específico de cada template para obtener instrucciones detalladas.

### Generar Componentes y Páginas

Los scripts de generación pueden utilizarse para crear rápidamente componentes y páginas con una estructura estandarizada:

```bash
# Para crear un componente
node scripts/create-component.js

# Para crear una página
node scripts/create-page.js
```

Estos scripts te guiarán a través de un proceso interactivo para especificar el nombre y tipo de componente o página que deseas crear.

## Requisitos

- Node.js (v14.x o superior)
- Git instalado en el sistema
- Token de GitHub con permisos para crear repositorios (para create-repo.sh)
- AWS CLI configurado (para backend-node)
- Serverless Framework (opcional, para backend-node)

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar los scripts existentes, añadir nuevos templates de proyectos o añadir nuevas funcionalidades, no dudes en crear un pull request.

## Roadmap

Próximas plantillas a implementar:

- Template de aplicación móvil con React Native
- Template para microservicios con NestJS
- Template para aplicaciones con MongoDB y Express

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT. 