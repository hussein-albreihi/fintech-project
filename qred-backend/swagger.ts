const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Qred Backend API',
      version: '1.0.0',
      description: 'API documentation for the Qred backend',
    },
    servers: [
      {
        url: 'http://localhost:3001', // Update this if your server URL changes
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to your route files
};

export default swaggerOptions;