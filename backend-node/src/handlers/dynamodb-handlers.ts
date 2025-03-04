import { 
  DynamoDBClient, 
  GetItemCommand, 
  PutItemCommand, 
  ScanCommand, 
  UpdateItemCommand, 
  DeleteItemCommand,
  AttributeValue,
  ReturnValue
} from '@aws-sdk/client-dynamodb';
import { 
  DynamoDBDocumentClient
} from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);
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
        id: { S: id },
        ...Object.entries(data).reduce((acc, [key, value]) => {
          acc[key] = convertToAttributeValue(value);
          return acc;
        }, {} as Record<string, AttributeValue>),
        createdAt: { S: timestamp },
        updatedAt: { S: timestamp }
      }
    };

    await dynamoDb.send(new PutItemCommand(params));

    // Convertimos de vuelta los AttributeValues a objetos normales para la respuesta
    const responseItem = {
      id,
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(responseItem)
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
 * Convierte un valor JavaScript a un AttributeValue de DynamoDB
 */
function convertToAttributeValue(value: any): AttributeValue {
  if (typeof value === 'string') return { S: value };
  if (typeof value === 'number') return { N: value.toString() };
  if (typeof value === 'boolean') return { BOOL: value };
  if (value === null || value === undefined) return { NULL: true };
  if (Array.isArray(value)) {
    if (value.length === 0) return { L: [] };
    
    // Determinar el tipo basado en el primer elemento
    if (typeof value[0] === 'string') return { SS: value };
    if (typeof value[0] === 'number') return { NS: value.map(n => n.toString()) };
    
    // Para arrays mixtos, convertimos cada elemento
    return { L: value.map(item => convertToAttributeValue(item)) };
  }
  if (typeof value === 'object') {
    const mapEntries = Object.entries(value).reduce((acc, [k, v]) => {
      acc[k] = convertToAttributeValue(v);
      return acc;
    }, {} as Record<string, AttributeValue>);
    return { M: mapEntries };
  }
  
  // Valor desconocido, convertimos a string como fallback
  return { S: String(value) };
}

/**
 * Convierte un objeto AttributeValue de DynamoDB a un valor JavaScript
 */
function convertFromAttributeValue(attributeValue: AttributeValue): any {
  if (attributeValue.S !== undefined) return attributeValue.S;
  if (attributeValue.N !== undefined) return Number(attributeValue.N);
  if (attributeValue.BOOL !== undefined) return attributeValue.BOOL;
  if (attributeValue.NULL !== undefined) return null;
  if (attributeValue.SS !== undefined) return attributeValue.SS;
  if (attributeValue.NS !== undefined) return attributeValue.NS.map(n => Number(n));
  if (attributeValue.L !== undefined) return attributeValue.L.map(item => convertFromAttributeValue(item));
  if (attributeValue.M !== undefined) {
    return Object.entries(attributeValue.M).reduce((acc, [k, v]) => {
      acc[k] = convertFromAttributeValue(v);
      return acc;
    }, {} as Record<string, any>);
  }
  
  return null;
}

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
      Key: {
        id: { S: id }
      }
    };

    const result = await dynamoDb.send(new GetItemCommand(params));

    if (!result.Item) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Ítem no encontrado' })
      };
    }

    // Convertir los AttributeValues a un objeto normal
    const item = Object.entries(result.Item).reduce((acc, [key, value]) => {
      acc[key] = convertFromAttributeValue(value);
      return acc;
    }, {} as Record<string, any>);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
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

    const result = await dynamoDb.send(new ScanCommand(params));

    // Convertir los AttributeValues a objetos normales
    const items = result.Items ? result.Items.map(item => {
      return Object.entries(item).reduce((acc, [key, value]) => {
        acc[key] = convertFromAttributeValue(value);
        return acc;
      }, {} as Record<string, any>);
    }) : [];

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items)
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
      Key: {
        id: { S: id }
      }
    };

    const getResult = await dynamoDb.send(new GetItemCommand(getParams));

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
    const expressionAttributeValues: Record<string, AttributeValue> = {};

    // Siempre actualizamos la fecha de modificación
    updateExpressionParts.push('#updatedAt = :updatedAt');
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    expressionAttributeValues[':updatedAt'] = { S: timestamp };

    // Añadimos cada campo a actualizar
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt') { // No permitimos modificar id ni createdAt
        const attrName = `#${key}`;
        const attrValue = `:${key}`;
        
        updateExpressionParts.push(`${attrName} = ${attrValue}`);
        expressionAttributeNames[attrName] = key;
        expressionAttributeValues[attrValue] = convertToAttributeValue(data[key]);
      }
    });

    const updateExpression = `SET ${updateExpressionParts.join(', ')}`;

    const updateParams = {
      TableName: TABLE_NAME,
      Key: {
        id: { S: id }
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW' as ReturnValue
    };

    const result = await dynamoDb.send(new UpdateItemCommand(updateParams));

    // Convertir los AttributeValues a un objeto normal
    const updatedItem = result.Attributes ? Object.entries(result.Attributes).reduce((acc, [key, value]) => {
      acc[key] = convertFromAttributeValue(value);
      return acc;
    }, {} as Record<string, any>) : {};

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
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
      Key: {
        id: { S: id }
      }
    };

    const getResult = await dynamoDb.send(new GetItemCommand(getParams));

    if (!getResult.Item) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Ítem no encontrado' })
      };
    }

    const deleteParams = {
      TableName: TABLE_NAME,
      Key: {
        id: { S: id }
      },
      ReturnValues: 'ALL_OLD' as ReturnValue
    };

    const result = await dynamoDb.send(new DeleteItemCommand(deleteParams));

    // Convertir los AttributeValues a un objeto normal
    const deletedItem = result.Attributes ? Object.entries(result.Attributes).reduce((acc, [key, value]) => {
      acc[key] = convertFromAttributeValue(value);
      return acc;
    }, {} as Record<string, any>) : {};

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deletedItem)
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