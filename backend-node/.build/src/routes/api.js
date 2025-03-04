"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Ruta GET de ejemplo
router.get('/hello', (req, res) => {
    res.json({ message: 'Hello World!' });
});
// Ruta POST de ejemplo
router.post('/echo', (req, res) => {
    const data = req.body;
    res.json({
        message: 'Echo de los datos recibidos',
        data,
        timestamp: new Date().toISOString()
    });
});
// Ruta con parámetro
router.get('/users/:id', (req, res) => {
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
exports.default = router;
//# sourceMappingURL=api.js.map