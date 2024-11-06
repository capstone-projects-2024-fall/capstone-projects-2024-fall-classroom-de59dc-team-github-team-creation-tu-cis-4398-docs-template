const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  // Only handle POST requests with sensor data
  if (event.httpMethod === 'POST') {
    try {
      // Parse the incoming JSON data
      const body = JSON.parse(event.body);
      const { lux, soil_moisture } = body;

      // Log the received data
      console.log(`Received data - Lux: ${lux}, Soil Moisture: ${soil_moisture}`);


      // Return a success response
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Sensor data processed successfully',
          received: { lux, soil_moisture },
        }),
      };
    } catch (error) {
      console.error('Error processing sensor data:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to process sensor data', error }),
      };
    }
  } else {
    // If not a POST request, return an error
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed. Only POST requests are accepted.' }),
    };
  }
};
