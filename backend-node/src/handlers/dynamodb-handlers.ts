import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';

const dynamoDb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE || 'items-table';

/**
 * Crea un nuevo ítem en DynamoDB
 */
export const createItem = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'No se proporcionaron datos' })
      };
    }

    const data = JSON.parse(event.body);
    const timestamp = new Date().toISOString();
    const id = uuidv4();

    const params = {
      TableName: TABLE_NAME,
      Item: {
        id,
        ...data,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    };

    await dynamoDb.put(params).promise();

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params.Item)
    };
  } catch (error) {
    console.error('Error al crear ítem en DynamoDB:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error al procesar la solicitud' })
    };
  }
};

/**
 * Obtiene un ítem específico de DynamoDB
 */
export const getItem = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'ID de ítem no proporcionado' })
      };
    }

    const params = {
      TableName: TABLE_NAME,
      Key: { id }
    };

    const result = await dynamoDb.get(params).promise();

    if (!result.Item) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Ítem no encontrado' })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    console.error('Error al obtener ítem de DynamoDB:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error al procesar la solicitud' })
    };
  }
};

/**
 * Obtiene todos los ítems de DynamoDB
 */
export const scanItems = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = {
      TableName: TABLE_NAME
    };

    const result = await dynamoDb.scan(params).promise();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.Items)
    };
  } catch (error) {
    console.error('Error al escanear ítems de DynamoDB:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error al procesar la solicitud' })
    };
  }
};

/**
 * Actualiza un ítem en DynamoDB
 */
export const updateItem = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'ID de ítem no proporcionado' })
      };
    }

    if (!event.body) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'No se proporcionaron datos para actualizar' })
      };
    }

    const data = JSON.parse(event.body);
    const timestamp = new Date().toISOString();

    // Verificamos que el ítem existe
    const getParams = {
      TableName: TABLE_NAME,
      Key: { id }
    };

    const getResult = await dynamoDb.get(getParams).promise();

    if (!getResult.Item) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Ítem no encontrado' })
      };
    }

    // Construimos la expresión de actualización dinámicamente
    const updateExpressionParts: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    // Siempre actualizamos la fecha de modificación
    updateExpressionParts.push('#updatedAt = :updatedAt');
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    expressionAttributeValues[':updatedAt'] = timestamp;

    // Añadimos cada campo a actualizar
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt') { // No permitimos modificar id ni createdAt
        const attrName = `#${key}`;
        const attrValue = `:${key}`;
        
        updateExpressionParts.push(`${attrName} = ${attrValue}`);
        expressionAttributeNames[attrName] = key;
        expressionAttributeValues[attrValue] = data[key];
      }
    });

    const updateExpression = `SET ${updateExpressionParts.join(', ')}`;

    const updateParams = {
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    };

    const result = await dynamoDb.update(updateParams).promise();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.Attributes)
    };
  } catch (error) {
    console.error('Error al actualizar ítem en DynamoDB:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error al procesar la solicitud' })
    };
  }
};

/**
 * Elimina un ítem de DynamoDB
 */
export const deleteItem = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'ID de ítem no proporcionado' })
      };
    }

    // Verificamos que el ítem existe
    const getParams = {
      TableName: TABLE_NAME,
      Key: { id }
    };

    const getResult = await dynamoDb.get(getParams).promise();

    if (!getResult.Item) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Ítem no encontrado' })
      };
    }

    const deleteParams = {
      TableName: TABLE_NAME,
      Key: { id },
      ReturnValues: 'ALL_OLD'
    };

    const result = await dynamoDb.delete(deleteParams).promise();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: 'Ítem eliminado correctamente',
        deletedItem: result.Attributes
      })
    };
  } catch (error) {
    console.error('Error al eliminar ítem de DynamoDB:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error al procesar la solicitud' })
    };
  }
}; 