export declare const config: {
    server: {
        port: string | number;
        env: string;
    };
    database: {
        url: string;
        options: {
            useNewUrlParser: boolean;
            useUnifiedTopology: boolean;
        };
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    cors: {
        origin: string;
        methods: string[];
        allowedHeaders: string[];
    };
    logger: {
        level: string;
    };
};
