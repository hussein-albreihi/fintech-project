import request from 'supertest';
import express from 'express';
import loanRoutes from '../../routes/loanRoutes';

const app = express();
app.use(express.json());
app.use('/api/loans', loanRoutes);

describe('GET /api/loans', () => {
  it('should return all loans (empty or seeded)', async () => {
    const response = await request(app).get('/api/loans');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
