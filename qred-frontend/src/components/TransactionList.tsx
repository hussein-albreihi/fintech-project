const transactions = [
  { id: 1, name: 'Amazon', date: '10 Apr', amount: '-500 kr' },
  { id: 2, name: 'Starbucks', date: '8 Apr', amount: '-52 kr' },
  { id: 3, name: 'Qred', date: '6 Apr', amount: '+10 000 kr' },
];

export default function TransactionList() {
  return (
    <div>
      <div className="text-sm text-gray-500 mb-2">Latest transactions</div>
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <div className="font-medium">{tx.name}</div>
              <div className="text-sm text-gray-500">{tx.date}</div>
            </div>
            <div className={`text-sm font-semibold ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
              {tx.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
