// src/components/CompanyDropdown.tsx
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { User } from '../models/models';

interface CompanyDropdownProps {
  onSelect: (user: User) => void;
  selectedUser: User | null;
}

const CompanyDropdown = ({ onSelect, selectedUser }: CompanyDropdownProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    api.get<User[]>('/users')
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);

  const handleSelect = (user: User) => {
    onSelect(user);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full bg-gray-100 rounded px-4 py-2 text-gray-800 font-medium flex justify-between items-center"
      >
        {selectedUser ? selectedUser.name : 'Select a company'}
        <span className="ml-2">⌄</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-md z-10">
          {users.map((user) => (
            <div
              key={user.id}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${
                selectedUser?.id === user.id ? 'bg-gray-200 font-bold' : ''
              }`}
              onClick={() => handleSelect(user)}
            >
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyDropdown;
