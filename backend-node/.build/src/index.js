"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Inicializar aplicación Express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware para procesar JSON
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Ruta básica de ejemplo
app.get('/', (req, res) => {
    res.json({
        message: 'API funcionando correctamente',
        status: 'success',
        timestamp: new Date().toISOString()
    });
});
// Middleware para manejo de errores
app.use((err, req, res, next) => {
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
//# sourceMappingURL=index.js.map