import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/helpers';
import Modal from './ui/Modal';

const WalletBalance: React.FC = () => {
  const { balance, addIncome } = useExpense();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState('');

  const handleAddIncome = () => {
    const amount = parseFloat(incomeAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    addIncome(amount);
    setIncomeAmount('');
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-gray-700 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2 text-white">Wallet Balance: <span className="text-green-400">{formatCurrency(balance)}</span></h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-1"
        >
          <Plus size={18} /> Add Income
        </button>
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Balance"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="income-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Income Amount
            </label>
            <input
              id="income-amount"
              type="number"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              min="1"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddIncome}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Add Balance
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WalletBalance;