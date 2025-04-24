import { getLoanById } from '../../services/loanService';
import prisma from '../../utils/prisma';

jest.mock('../../utils/prisma', () => ({
  loan: {
    findUnique: jest.fn(),
  },
}));

describe('loanService.getLoanById', () => {
  it('should return loan when found', async () => {
    const fakeLoan = {
      id: 1,
      amount: 1000,
      user: { id: 1, name: 'Test User' },
    };

    (prisma.loan.findUnique as jest.Mock).mockResolvedValue(fakeLoan);

    const result = await getLoanById(1);
    expect(prisma.loan.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { user: true },
    });
    expect(result).toEqual(fakeLoan);
  });

  it('should return null if no loan is found', async () => {
    (prisma.loan.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await getLoanById(999);
    expect(result).toBeNull();
  });
});


