"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const aws_sdk_1 = require("aws-sdk");
const ses = new aws_sdk_1.SES();
// Dirección de correo verificada en SES (reemplazar en producción)
const SOURCE_EMAIL = process.env.SOURCE_EMAIL || 'no-reply@example.com';
/**
 * Envía un email usando Amazon SES
 */
const sendEmail = async (event) => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'No se proporcionaron datos para el envío de correo' })
            };
        }
        const emailRequest = JSON.parse(event.body);
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
        const emailParams = {
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
    }
    catch (error) {
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
exports.sendEmail = sendEmail;
//# sourceMappingURL=email-handlers.js.map