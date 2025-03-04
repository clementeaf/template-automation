"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// Configuración del entorno
exports.config = {
    // Configuración del servidor
    server: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
    },
    // Configuración de la base de datos
    database: {
        url: process.env.DATABASE_URL || 'mongodb://localhost:27017/mydatabase',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    // Configuración de JWT
    jwt: {
        secret: process.env.JWT_SECRET || 'my-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
    // Configuración de CORS
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
    // Otras configuraciones
    logger: {
        level: process.env.LOG_LEVEL || 'info',
    },
};
//# sourceMappingURL=config.js.map