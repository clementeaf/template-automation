import { createAlova } from 'alova';
import { ReactHook } from 'alova/react';
import { xhrRequestAdapter } from '@alova/adapter-xhr';

// Definimos interfaces para los tipos
interface Config {
  headers: Record<string, string>;
  [key: string]: unknown;
}

interface Response {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
}

// Creamos una instancia de Alova
const alovaInstance = createAlova({
  // Base URL para todas las peticiones
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  
  // Configuración para que funcione con React
  statesHook: ReactHook,
  
  // Usamos XHR como implementación para las peticiones HTTP
  requestAdapter: xhrRequestAdapter(),
  
  // Configuramos cabeceras por defecto
  beforeRequest: ({ config }: { config: Config }) => {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
    };
    
    // Si hay un token en localStorage, lo añadimos a las cabeceras
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  },
  
  // Manejamos errores globalmente
  responded: async (response: Response) => {
    if (!response.ok) {
      // Si la respuesta no es exitosa, lanzamos un error
      const error = await response.json().catch(() => ({}));
      throw new Error((error as { message?: string }).message || 'Error en la petición');
    }
    return response.json();
  },
});

export default alovaInstance; 