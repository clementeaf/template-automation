"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFile = exports.uploadFile = void 0;
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
const s3 = new aws_sdk_1.S3();
const BUCKET = process.env.BUCKET_NAME || `${process.env.SERVICE_NAME}-${process.env.STAGE}-bucket`;
/**
 * Sube un archivo a S3
 */
const uploadFile = async (event) => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'No se proporcionó contenido para subir' })
            };
        }
        const fileContent = Buffer.from(event.isBase64Encoded
            ? event.body.replace(/^data:image\/\w+;base64,/, '')
            : event.body, event.isBase64Encoded ? 'base64' : 'utf8');
        const contentType = event.headers['content-type'] || 'application/octet-stream';
        const fileId = (0, uuid_1.v4)();
        const fileExtension = contentType.split('/')[1] || '';
        const key = `uploads/${fileId}.${fileExtension}`;
        const params = {
            Bucket: BUCKET,
            Key: key,
            Body: fileContent,
            ContentType: contentType
        };
        const uploadResult = await s3.putObject(params).promise();
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: 'Archivo subido exitosamente',
                fileId: fileId,
                fileUrl: `https://${BUCKET}.s3.amazonaws.com/${key}`,
                etag: uploadResult.ETag
            })
        };
    }
    catch (error) {
        console.error('Error al subir archivo a S3:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Error al procesar la solicitud' })
        };
    }
};
exports.uploadFile = uploadFile;
/**
 * Obtiene un archivo de S3
 */
const getFile = async (event) => {
    try {
        const fileId = event.pathParameters?.fileId;
        if (!fileId) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'ID de archivo no proporcionado' })
            };
        }
        // Buscar en el bucket todos los archivos que comiencen con uploads/{fileId}
        const listParams = {
            Bucket: BUCKET,
            Prefix: `uploads/${fileId}`
        };
        const listedObjects = await s3.listObjectsV2(listParams).promise();
        if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
            return {
                statusCode: 404,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Archivo no encontrado' })
            };
        }
        // Obtener la URL firmada para el primer objeto encontrado
        const key = listedObjects.Contents[0].Key;
        const signedUrl = s3.getSignedUrl('getObject', {
            Bucket: BUCKET,
            Key: key,
            Expires: 3600 // URL válida por 1 hora
        });
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fileUrl: signedUrl,
                bucket: BUCKET,
                key: key
            })
        };
    }
    catch (error) {
        console.error('Error al obtener archivo de S3:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Error al procesar la solicitud' })
        };
    }
};
exports.getFile = getFile;
//# sourceMappingURL=s3-handlers.js.map