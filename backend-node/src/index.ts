import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

// Inicializar aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta básica de ejemplo
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'API funcionando correctamente',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// Middleware para manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Ha ocurrido un error en el servidor',
    status: 'error'
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
}); 