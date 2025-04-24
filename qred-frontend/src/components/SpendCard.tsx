const SpendCard = ({ amount = 0 }: { amount: number | undefined }) => {
  const limit = 10000;
  const remaining = limit - amount;

  return (
    <div className="bg-gray-100 p-4 rounded shadow-sm text-center">
      <div className="text-sm font-medium mb-1">Remaining spend</div>
      <div className="text-xl font-bold">{`${remaining} / ${limit} kr`}</div>
      <div className="text-xs text-gray-500 mt-1">
        based on your set limit
      </div>
    </div>
  );
};

export default SpendCard