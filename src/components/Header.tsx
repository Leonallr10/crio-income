import React from 'react';
import { PiggyBank } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PiggyBank size={28} className="text-green-400" />
          <h1 className="text-2xl font-bold">Expense Tracker</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;