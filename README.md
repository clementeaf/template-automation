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

### Templates de Proyectos (Por implementar)

Este repositorio incluirá templates de proyectos mínimos configurados y listos para usar. Por ejemplo:

- **frontend-nextjs/**: Proyecto mínimo de Next.js configurado con:
  - TypeScript
  - ESLint y Prettier
  - TailwindCSS
  - Estructura de carpetas optimizada
  - Componentes básicos reutilizables

- **backend-nodets/**: Proyecto mínimo de Node.js con TypeScript:
  - Estructura de API RESTful
  - Configuración de TypeScript optimizada
  - ESLint y Prettier
  - Sistema de logging y manejo de errores

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

Cuando estén implementados los templates, podrás iniciar un nuevo proyecto copiando la carpeta correspondiente:

```bash
# Próximamente: script para copiar un template y configurarlo automáticamente
# Por ejemplo:
# ./iniciar-proyecto.sh frontend-nextjs mi-nuevo-proyecto
```

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

- Node.js instalado en el sistema
- Git instalado en el sistema
- Token de GitHub con permisos para crear repositorios
- Archivo .env configurado con el token de GitHub

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar los scripts existentes, añadir nuevos templates de proyectos o añadir nuevas funcionalidades, no dudes en crear un pull request.

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT. 