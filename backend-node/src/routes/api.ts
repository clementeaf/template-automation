import express, { Request, Response } from 'express';

const router = express.Router();

// Ruta GET de ejemplo
router.get('/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

// Ruta POST de ejemplo
router.post('/echo', (req: Request, res: Response) => {
  const data = req.body;
  res.json({ 
    message: 'Echo de los datos recibidos', 
    data,
    timestamp: new Date().toISOString()
  });
});

// Ruta con parámetro
router.get('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ 
    message: `Obteniendo información del usuario ${id}`,
    user: {
      id,
      name: 'Usuario de ejemplo',
      email: 'usuario@ejemplo.com'
    }
  });
});

export default router; 