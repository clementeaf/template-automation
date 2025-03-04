import { SES } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const ses = new SES();

// Dirección de correo verificada en SES (reemplazar en producción)
const SOURCE_EMAIL = process.env.SOURCE_EMAIL || 'no-reply@example.com';

// Estructura esperada para el cuerpo de la solicitud
interface EmailRequest {
  to: string | string[]; // Puede ser un solo correo o un array de correos
  subject: string;
  body: string;
  isHtml?: boolean; // Indica si el cuerpo es HTML
  replyTo?: string | string[]; // Opcional, dirección de respuesta
  cc?: string | string[]; // Opcional, correos en copia
  bcc?: string | string[]; // Opcional, correos en copia oculta
}

/**
 * Envía un email usando Amazon SES
 */
export const sendEmail = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'No se proporcionaron datos para el envío de correo' })
      };
    }

    const emailRequest: EmailRequest = JSON.parse(event.body);
    
    // Validamos los campos requeridos
    if (!emailRequest.to || !emailRequest.subject || !emailRequest.body) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Faltan campos requeridos: to, subject, body' })
      };
    }

    // Convertimos 'to' a array si es un solo valor
    const toAddresses = Array.isArray(emailRequest.to) ? emailRequest.to : [emailRequest.to];
    
    // Configuración del email
    const emailParams: SES.SendEmailRequest = {
      Source: SOURCE_EMAIL,
      Destination: {
        ToAddresses: toAddresses,
        CcAddresses: emailRequest.cc ? (Array.isArray(emailRequest.cc) ? emailRequest.cc : [emailRequest.cc]) : [],
        BccAddresses: emailRequest.bcc ? (Array.isArray(emailRequest.bcc) ? emailRequest.bcc : [emailRequest.bcc]) : []
      },
      Message: {
        Subject: {
          Data: emailRequest.subject,
          Charset: 'UTF-8'
        },
        Body: emailRequest.isHtml 
          ? {
              Html: {
                Data: emailRequest.body,
                Charset: 'UTF-8'
              }
            }
          : {
              Text: {
                Data: emailRequest.body,
                Charset: 'UTF-8'
              }
            }
      },
      ReplyToAddresses: emailRequest.replyTo 
        ? (Array.isArray(emailRequest.replyTo) ? emailRequest.replyTo : [emailRequest.replyTo]) 
        : [SOURCE_EMAIL]
    };

    // Enviar el email
    const result = await ses.sendEmail(emailParams).promise();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Email enviado correctamente',
        messageId: result.MessageId
      })
    };
  } catch (error) {
    console.error('Error al enviar email con SES:', error);
    
    if (error instanceof Error && error.name === 'MessageRejected') {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          error: 'El email fue rechazado', 
          details: error.message
        })
      };
    }
    
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error al procesar la solicitud' })
    };
  }
}; 