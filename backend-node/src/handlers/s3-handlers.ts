import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3Client({});
const SERVICE_NAME = process.env.SERVICE_NAME || 'backend-serverless';
const STAGE = process.env.STAGE || 'dev';
const BUCKET_NAME = process.env.BUCKET_NAME || `${SERVICE_NAME}-${STAGE}-bucket`;

/**
 * Sube un archivo a S3
 */
export const uploadFile = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'No se proporcionaron datos' })
      };
    }

    const fileId = uuidv4();
    
    let fileContent: Buffer;
    let contentType: string;
    
    if (event.isBase64Encoded) {
      fileContent = Buffer.from(event.body, 'base64');
      contentType = event.headers['content-type'] || event.headers['Content-Type'] || 'application/octet-stream';
    } else {
      try {
        const jsonBody = JSON.parse(event.body);
        if (jsonBody.file && jsonBody.contentType) {
          fileContent = Buffer.from(jsonBody.file, 'base64');
          contentType = jsonBody.contentType;
        } else {
          return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Formato de datos incorrecto' })
          };
        }
      } catch (e) {
        fileContent = Buffer.from(event.body);
        contentType = event.headers['content-type'] || event.headers['Content-Type'] || 'application/octet-stream';
      }
    }
    
    const key = `uploads/${fileId}/${fileId}`;
    
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileContent,
      ContentType: contentType
    };
    
    const uploadResult = await s3.send(new PutObjectCommand(params));
    
    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Archivo subido exitosamente',
        fileId: fileId,
        fileUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`,
        etag: uploadResult.ETag
      })
    };
  } catch (error) {
    console.error('Error al subir archivo a S3:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error al procesar la solicitud' })
    };
  }
};

/**
 * Obtiene un archivo de S3
 */
export const getFile = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const fileId = event.pathParameters?.fileId;
    
    if (!fileId) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'ID de archivo no proporcionado' })
      };
    }
    
    const listParams = {
      Bucket: BUCKET_NAME,
      Prefix: `uploads/${fileId}`
    };
    
    const listedObjects = await s3.send(new ListObjectsV2Command(listParams));
    
    if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Archivo no encontrado' })
      };
    }
    
    const key = listedObjects.Contents[0].Key;
    if (!key) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Clave de archivo no encontrada' })
      };
    }

    const signedUrl = await getSignedUrl(s3, new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    }), { expiresIn: 3600 });
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileUrl: signedUrl,
        bucket: BUCKET_NAME,
        key: key
      })
    };
  } catch (error) {
    console.error('Error al obtener archivo de S3:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error al procesar la solicitud' })
    };
  }
}; 