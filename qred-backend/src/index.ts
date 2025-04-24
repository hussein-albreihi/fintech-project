import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerOptions from '../swagger';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import loanRoutes from '../routes/loanRoutes';
import userRoutes from '../routes/userRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const swaggerSpec = swaggerJsDoc(swaggerOptions);

app.use(cors());
app.use(express.json());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/loans', loanRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});