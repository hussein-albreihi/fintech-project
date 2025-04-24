import request from 'supertest';
import express from 'express';
import loanRoutes from '../../routes/loanRoutes';
import * as loanService from '../../services/loanService';

jest.mock('../../services/loanService');

const app = express();
app.use(express.json());
app.use('/api/loans', loanRoutes);

jest.mock('../../utils/prisma', () => ({
  loan: {
    create: jest.fn(),
  },
}));

describe('POST /api/loans', () => {
  const mockLoan = {
    id: 1,
    userId: 1,
    amount: 1000,
    interestRate: 5,
    startDate: new Date(),
    dueDate: new Date(),
    status: 'ACTIVE',
  };

  beforeEach(() => {
    jest.spyOn(loanService, 'createLoan').mockResolvedValue(mockLoan as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new loan and return 201', async () => {
    const res = await request(app).post('/api/loans').send({
      userId: 1,
      amount: 1000,
      interestRate: 5,
      startDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      status: 'ACTIVE',
    });

    expect(res.status).toBe(201);
  });
});
