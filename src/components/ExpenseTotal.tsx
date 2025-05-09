import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/helpers';
import ExpenseForm from './ExpenseForm';
import Modal from './ui/Modal';

const ExpenseTotal: React.FC = () => {
  const { totalExpenses } = useExpense();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-700 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2 text-white">Expenses: <span className="text-orange-400">{formatCurrency(totalExpenses)}</span></h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-1"
        >
          <Plus size={18} /> Add Expense
        </button>
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Expense"
      >
        <ExpenseForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default ExpenseTotal;