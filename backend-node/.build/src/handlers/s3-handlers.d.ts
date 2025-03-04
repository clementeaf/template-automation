import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
/**
 * Sube un archivo a S3
 */
export declare const uploadFile: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
/**
 * Obtiene un archivo de S3
 */
export declare const getFile: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
