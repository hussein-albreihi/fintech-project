const InvoiceCard = ({ dueDate = new Date() }: { dueDate: Date | undefined }) => {
  const parsedDueDate = new Date(dueDate).toLocaleDateString()

  return (<div className="bg-gray-100 p-4 rounded shadow-sm">
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium">Invoice due</span>
      <span>➔</span>
    </div>
    <div className="bg-white p-6 rounded shadow-inner text-center text-gray-700">
      {parsedDueDate}
    </div>
  </div>)
};

export default InvoiceCard