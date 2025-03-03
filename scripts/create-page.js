#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Plantilla para página
const pageTemplate = (title) => `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title}',
  description: 'Descripción de la página ${title}',
};

export default function ${title.replace(/\s+/g, '')}Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">${title}</h1>
      <div className="bg-white rounded-lg p-6 shadow-md">
        <p>Contenido de la página</p>
      </div>
    </main>
  );
}
`;

// Plantilla para layout si es necesario
const layoutTemplate = `export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-layout">
      {children}
    </div>
  );
}
`;

// Preguntar el nombre de la página
rl.question('¿Nombre de la página? (ej. About) ', (name) => {
  if (!name) {
    console.error('Se requiere un nombre para la página');
    rl.close();
    return;
  }
  
  // Formato del título para el display
  const pageTitle = name.charAt(0).toUpperCase() + name.slice(1);
  
  // Formato del nombre para el directorio (minúsculas, guiones en lugar de espacios)
  const dirName = name.toLowerCase().replace(/\s+/g, '-');
  
  rl.question('¿Ruta de la página? (ej. about, dashboard/settings) ', (route) => {
    // Usar la ruta proporcionada o el nombre en minúsculas como predeterminado
    const pagePath = route || dirName;
    
    // Crear el directorio para la página
    const pageDir = path.join(__dirname, '..', 'src', 'app', pagePath);
    const pageFile = path.join(pageDir, 'page.tsx');
    
    rl.question('¿Crear también un layout? (s/n) ', (createLayout) => {
      // Crear directorio si no existe
      if (!fs.existsSync(pageDir)) {
        fs.mkdirSync(pageDir, { recursive: true });
      }
      
      // Crear archivo page.tsx
      fs.writeFileSync(pageFile, pageTemplate(pageTitle));
      console.log(`Página creada en ${pageFile}`);
      
      // Crear layout.tsx si se solicitó
      if (createLayout.toLowerCase() === 's') {
        const layoutFile = path.join(pageDir, 'layout.tsx');
        fs.writeFileSync(layoutFile, layoutTemplate);
        console.log(`Layout creado en ${layoutFile}`);
      }
      
      rl.close();
    });
  });
}); 