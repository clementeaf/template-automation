# Template Next.js con TanStack Query y AlovaJS

Este es un template mínimo y moderno de Next.js configurado con herramientas actuales para el desarrollo frontend, diseñado para ser una base sólida y fácil de extender para aplicaciones web.

## Características

- ✅ **Next.js 15** con App Router
- ✅ **TypeScript** para tipado estático
- ✅ **Tailwind CSS** para estilos con sistema de variables CSS
- ✅ **TanStack Query v5** para gestión de estado del servidor
- ✅ **AlovaJS** para peticiones HTTP eficientes
- ✅ **Sistema de temas** (claro/oscuro) con detección automática de preferencias
- ✅ **ESLint y Prettier** configurados para mantener código limpio
- ✅ **Componentes cliente/servidor** correctamente separados
- ✅ **Optimizado para rendimiento** con carga sin parpadeo de tema

## Estructura del Proyecto

```
frontend-nextjs/
├── public/              # Archivos estáticos
├── src/
│   ├── app/             # Páginas y layouts (App Router)
│   │   ├── globals.css  # Estilos globales y variables CSS
│   │   ├── layout.tsx   # Layout raíz con proveedores
│   │   └── page.tsx     # Página principal
│   ├── components/      # Componentes reutilizables
│   │   ├── ui/          # Componentes de interfaz de usuario
│   │   └── Header.tsx   # Componente de cabecera
│   ├── lib/             # Utilidades y configuraciones
│   │   ├── providers/   # Proveedores de contexto
│   │   └── alova.ts     # Configuración de AlovaJS
│   └── types/           # Definiciones de tipos
└── ...                  # Archivos de configuración
```

## Sistema de Temas

El template incluye un sistema de temas claro/oscuro que:

1. Detecta automáticamente las preferencias del sistema
2. Persiste la selección del usuario en localStorage
3. Evita el parpadeo de tema durante la carga inicial con un script en línea
4. Proporciona un toggle en el header para cambiar fácilmente entre temas
5. Utiliza variables CSS para una estilización consistente

## Proveedores Incluidos

- **QueryProvider**: Configuración de TanStack Query v5 para gestionar peticiones y caché
- **Providers**: Componente que encapsula los proveedores necesarios para la aplicación

## Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia la aplicación en modo producción
- `npm run lint`: Ejecuta el linter para encontrar problemas
- `npm run format`: Formatea el código con Prettier

## Personalización

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```
NEXT_PUBLIC_API_URL=https://tu-api.com
```

### Peticiones con AlovaJS

El cliente Alova está configurado en `src/lib/alova.ts` y puede ser utilizado para realizar peticiones HTTP a tu API. Ejemplo de uso:

```typescript
import { alovaInstance } from '@/lib/alova';
import { useRequest } from 'alova';

// En tu componente
const { data, loading, error } = useRequest(alovaInstance.Get('/api/endpoint'));
```

### Tema y Diseño

Puedes personalizar los colores del tema editando `src/app/globals.css`. El sistema utiliza variables CSS para definir colores en los modos claro y oscuro:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  /* Otras variables... */
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
  /* Otras variables... */
}
```

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o una pull request para sugerencias o mejoras.

## Licencia

MIT
