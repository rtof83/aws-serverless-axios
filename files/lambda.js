const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = "TABLE_NAME";

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = { "Content-Type": "application/json" };

  try {
    switch (event.routeKey) {
      
      case "DELETE /v1/{id}":
        await dynamo
          .delete({
            TableName: TableName,
            Key: {
              date: event.pathParameters.id
            },
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
        
      case "GET /v1":
        body = await dynamo.scan({ TableName: TableName }).promise();
        break;
        
      case "GET /v1/{id}":
        body = await dynamo
          .get({
            TableName: TableName,
            Key: {
              date: event.pathParameters.id
            }
          })
          .promise();
        break;
        
      case "PUT /v1":
        console.log("Processing...");
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: TableName,
            Item: {
              date: requestJSON.date,
              name: requestJSON.name,
              message: requestJSON.message
            }
          })
          .promise();
        body = `Item ${requestJSON.message} added`;
        break;
        
      case "POST /v1/{id}":
        await dynamo
          .update({
            TableName: TableName,
            Key: { date: event.pathParameters.id },
            UpdateExpression: "set #n = :name, message = :message",
            ExpressionAttributeValues: {
              ":name": JSON.parse(event.body).name,
              ":message": JSON.parse(event.body).message
            },
            ExpressionAttributeNames: {
              "#n": "name"
            },
            ReturnValues: "UPDATED_NEW"
          }).promise();
        body = `Item ${event.pathParameters.id} updated`;
        break;
        
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};