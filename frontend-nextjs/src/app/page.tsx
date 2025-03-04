'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';

// Ejemplo de una función que simula una petición a una API
const fetchGreeting = async () => {
  // Simulamos una petición con un retardo
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { message: "¡Hola desde la API!" };
};

export default function Home() {
  // Usando React Query para datos
  const { data, isLoading, error } = useQuery({
    queryKey: ['greeting'],
    queryFn: fetchGreeting,
  });

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto p-8">
        <h1 className="mb-8 text-4xl font-bold">Next.js Template</h1>
        
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <FeatureCard 
            title="Sistema de Temas" 
            description="Cambia fácilmente entre temas claro y oscuro con el botón en la barra superior."
            icon="🌓"
          />
          <FeatureCard 
            title="TanStack Query" 
            description="Gestión eficiente del estado del servidor para mejores experiencias."
            icon="🔄"
          />
          <FeatureCard 
            title="AlovaJS" 
            description="Cliente HTTP flexible y eficiente para comunicación con APIs."
            icon="📡"
          />
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">Ejemplo de React Query</h2>
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800 dark:text-white text-gray-800">
            {isLoading ? (
              <p>Cargando datos...</p>
            ) : error ? (
              <p className="text-red-500">Error al cargar los datos</p>
            ) : (
              <p className="font-medium">{data?.message}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
