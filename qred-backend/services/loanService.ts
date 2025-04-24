import prisma from '../utils/prisma';

export async function getLoanById(id: number) {
  return await prisma.loan.findUnique({
    where: { id },
    include: { user: true },
  });
}

export async function createLoan(data: {
  userId: number;
  amount: number;
  interestRate: number;
  startDate: Date;
  dueDate: Date;
  status: 'ACTIVE' | 'PAID' | 'OVERDUE';
}) {
  return await prisma.loan.create({ data });
}
