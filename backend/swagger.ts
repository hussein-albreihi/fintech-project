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
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./src/routes/*.ts']
};

export default swaggerOptions;