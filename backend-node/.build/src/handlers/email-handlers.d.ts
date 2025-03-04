import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
/**
 * Envía un email usando Amazon SES
 */
export declare const sendEmail: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
