import CompanyDropdown from '../components/CompanyDropdown';
import InvoiceCard from '../components/InvoiceCard';
import SpendCard from '../components/SpendCard';
import TransactionList from '../components/TransactionList';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Loan, User } from '../models/models';

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loan, setLoan] = useState<Loan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedUser) return;
    api.get<Loan[]>('/loans?userId=' + selectedUser.id)
      .then((res) => setLoan(res.data[0]))
      .catch(console.error);
  }, [selectedUser]);

  useEffect(() => {
    api.get('/loans/2')
      .then(res => setLoan(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-[375px] mx-auto bg-white min-h-screen p-4 space-y-4 shadow-xl rounded-xl">
      <div className="flex justify-between items-center">
        <div className="font-bold text-lg">Logo</div>
        <div className="font-semibold">Menu</div>
      </div>

      <CompanyDropdown
        selectedUser={selectedUser}
        onSelect={(user) => setSelectedUser(user)}
      />


      <InvoiceCard dueDate={new Date(loan?.dueDate ?? "")} />

      <SpendCard amount={loan?.amount} />

      <TransactionList />

      <Button variant="primary">Activate card</Button>
      <Button variant="secondary">Contact Qred's support</Button>
    </div>
  );
}
