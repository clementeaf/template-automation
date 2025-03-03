# 🚀 Next.js Modern Starter Template

Esta es una plantilla moderna y flexible para aplicaciones web, diseñada para servir como punto de partida para prácticamente cualquier proyecto que necesites construir.

## ✨ Características

- ⚡ **Next.js 15**: Framework React moderno con renderizado híbrido
- 🎨 **TailwindCSS 4**: Sistema de diseño utilitario para desarrollo rápido
- 🔄 **TanStack React Query**: Gestión eficiente de estado del servidor
- 🌓 **Sistema de Temas Claro/Oscuro**: Implementación completa con persistencia
- 📱 **Diseño Responsivo**: Adaptable a cualquier dispositivo
- 🔍 **SEO Optimizado**: Estructurado para mejor indexación
- 🛠️ **TypeScript**: Tipado estático para código más seguro
- 📏 **ESLint & Prettier**: Calidad y consistencia de código
- 🔧 **Scripts Útiles**: Automatización para tareas comunes

## 📋 Requisitos Previos

- Node.js 18.0.0 o superior
- npm o yarn
- Conocimientos básicos de React y Next.js

## 🚦 Inicio Rápido

```bash
# Clonar el repositorio
git clone https://github.com/clementeaf/template-automation.git mi-proyecto

# Navegar al directorio
cd mi-proyecto

# Instalar dependencias
npm install
# o
yarn install

# Iniciar servidor de desarrollo
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 📁 Estructura de Carpetas

```
src/
├── app/                    # App Router de Next.js
│   ├── api/                # Rutas de API
│   ├── (routes)/           # Rutas de la aplicación
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página de inicio
├── components/             # Componentes reutilizables
│   ├── forms/              # Componentes de formularios
│   └── ui/                 # Componentes de interfaz de usuario
├── lib/                    # Bibliotecas y utilidades
│   └── providers/          # Proveedores de contexto
└── styles/                 # Estilos globales
```

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run start` | Inicia la aplicación en modo producción |
| `npm run lint` | Ejecuta ESLint para revisar el código |
| `npm run format` | Formatea el código con Prettier |
| `npm run create:component` | Crea un nuevo componente con código boilerplate |
| `npm run create:page` | Crea una nueva página con código boilerplate |

## 🎨 Personalización

### Sistema de Temas

El sistema de temas utiliza variables CSS y clases para mantener consistencia en toda la aplicación:

```css
/* Personaliza colores del tema claro */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  /* ... */
}

/* Personaliza colores del tema oscuro */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

### Tailwind

Modifica `tailwind.config.js` para personalizar:
- Colores
- Tipografía
- Espaciado
- Breakpoints responsivos
- Plugins

## 🔄 Adaptación a Diferentes Proyectos

Esta plantilla es altamente adaptable para diferentes tipos de proyectos:

### Para una Landing Page

1. Enfócate en la página principal (`src/app/page.tsx`)
2. Utiliza el sistema de componentes UI para crear secciones atractivas
3. Optimiza las metadatos para SEO

### Para un Dashboard Administrativo

1. Crea rutas protegidas en `src/app/(protected)/`
2. Añade sistema de autenticación (NextAuth.js se integra fácilmente)
3. Utiliza React Query para gestionar datos del servidor
4. Crea componentes de tabla, gráficos, etc.

### Para un E-commerce

1. Configura rutas para categorías y productos
2. Implementa carrito de compras con Context API o Zustand
3. Integra sistema de pagos
4. Gestiona estado de productos con React Query

## ❓ Resolución de Problemas

### Errores Comunes

| Problema | Solución |
|----------|----------|
| Errores de TypeScript | Ejecuta `npm install` para asegurar que todos los tipos estén instalados |
| Errores de hidratación | Asegúrate de usar correctamente los componentes del lado del cliente con `'use client'` |
| Errores de estilo | Verifica que tu configuración de Tailwind esté correctamente instalada |
| Rutas no encontradas | Comprueba la estructura de carpetas en `/app` siga las convenciones de Next.js |

Para más ayuda, consulta la [documentación oficial de Next.js](https://nextjs.org/docs).

## 🧩 Extensión

Para añadir más características a tu proyecto:

- **Autenticación**: Integra NextAuth.js
- **Estado Global**: Añade Zustand o Redux
- **Animaciones**: Incorpora Framer Motion
- **Formularios**: Añade React Hook Form + Zod
- **UI Components**: Integra Shadcn UI o Radix UI

## 📃 Licencia

MIT

---

¿Encontraste útil esta plantilla? Dale una ⭐ en GitHub y compártela con otros desarrolladores!
