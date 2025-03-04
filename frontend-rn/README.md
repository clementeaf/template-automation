# Template de React Native con Expo

Este es un template para aplicaciones móviles con React Native y Expo, configurado con las mejores prácticas y herramientas modernas para desarrollo de apps multiplataforma.

## Características

- ✅ **Expo SDK** - Desarrollo simplificado para Android, iOS y Web
- ✅ **TypeScript** - Desarrollo con tipado estático
- ✅ **Estructura organizada** - Estructura de carpetas optimizada para escalabilidad
- ✅ **React Navigation** - Sistema de navegación completo (a implementar)
- ✅ **Estado Global** - Configuración de Redux Toolkit o React Context (a implementar)
- ✅ **Estilos** - Sistema de temas y estilos coherentes (a implementar)
- ✅ **Testing** - Jest configurado para pruebas unitarias 
- ✅ **Componentes** - Biblioteca de componentes reutilizables (a implementar)
- ✅ **Networking** - Cliente HTTP con Axios (a implementar)
- ✅ **Storage** - Almacenamiento seguro de datos locales (a implementar)

## Requisitos previos

- Node.js 14.x o superior
- NPM o Yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app en tu dispositivo móvil (para desarrollo)

## Inicio rápido

```bash
# Clonar el template
git clone <url-repositorio>
cd frontend-rn

# Instalar dependencias
npm install
# o
yarn install

# Iniciar la aplicación
npx expo start
```

Cuando la aplicación esté ejecutándose, puedes:
- Escanear el código QR con la aplicación Expo Go en Android
- Escanear el código QR con la cámara en iOS (teniendo Expo Go instalado)
- Presionar 'a' para abrir en un emulador Android
- Presionar 'i' para abrir en un simulador iOS
- Presionar 'w' para abrir en web

## Estructura del proyecto

```
frontend-rn/
├── assets/                  # Recursos estáticos (imágenes, fuentes)
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── common/          # Componentes base (Button, Input, etc.)
│   │   └── screens/         # Componentes específicos de pantallas
│   ├── navigation/          # Configuración de navegación
│   ├── screens/             # Pantallas de la aplicación
│   ├── services/            # Servicios (API, almacenamiento, etc.)
│   ├── store/               # Estado global (Redux o Context)
│   ├── theme/               # Configuración de temas y estilos
│   └── utils/               # Utilidades y helpers
├── App.tsx                  # Componente principal (a mover dentro de src)
├── app.json                 # Configuración de Expo
├── tsconfig.json            # Configuración de TypeScript
├── package.json             # Dependencias y scripts
└── README.md                # Documentación
```

## Scripts disponibles

- `npm start` - Inicia el servidor de Expo
- `npm run android` - Ejecuta la aplicación en Android
- `npm run ios` - Ejecuta la aplicación en iOS (requiere macOS)
- `npm run web` - Ejecuta la aplicación en el navegador
- `npm run test` - Ejecuta los tests con Jest

## Próximos pasos

Este template es un punto de partida. Para un proyecto real, considera:

1. Configurar React Navigation para la navegación entre pantallas
2. Implementar un sistema de gestión de estado (Redux, Context)
3. Añadir un cliente HTTP como Axios para peticiones a APIs
4. Configurar un sistema de autenticación
5. Implementar almacenamiento local seguro

## Licencia

ISC 