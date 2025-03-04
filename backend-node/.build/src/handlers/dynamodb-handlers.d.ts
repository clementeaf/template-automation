import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
/**
 * Crea un nuevo ítem en DynamoDB
 */
export declare const createItem: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
/**
 * Obtiene un ítem específico de DynamoDB
 */
export declare const getItem: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
/**
 * Obtiene todos los ítems de DynamoDB
 */
export declare const scanItems: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
/**
 * Actualiza un ítem en DynamoDB
 */
export declare const updateItem: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
/**
 * Elimina un ítem de DynamoDB
 */
export declare const deleteItem: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
