export interface Loan {
  id: number;
  userId: number;
  amount: number;
  interestRate: number;
  startDate: string;
  dueDate: string;
  status: 'ACTIVE' | 'PAID' | 'OVERDUE';
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserWithLoans extends User {
  loans: Loan[];
}