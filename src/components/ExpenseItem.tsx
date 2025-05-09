import React, { useState } from 'react';
import { Trash2, Edit, Wifi } from 'lucide-react';
import { Expense } from '../types';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency, getCategoryColor } from '../utils/helpers';
import ExpenseForm from './ExpenseForm';
import Modal from './ui/Modal';

interface ExpenseItemProps {
  expense: Expense;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  const { deleteExpense } = useExpense();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const categoryColor = getCategoryColor(expense.category);
  
  const getCategoryIcon = () => {
    // This is a placeholder - you could map different icons to categories
    return <Wifi size={18} />;
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(expense.id);
    }
  };

  return (
    <>
      <div className="border-b border-gray-200 dark:border-gray-700 py-4 flex items-center">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
          {getCategoryIcon()}
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-gray-800 dark:text-gray-200">{expense.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{expense.date}</p>
        </div>
        
        <div className="text-right">
          <p className="font-medium text-orange-500">{formatCurrency(expense.amount)}</p>
          <p className="text-sm" style={{ color: categoryColor }}>{expense.category}</p>
        </div>
        
        <div className="ml-4 flex gap-2">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
            aria-label="Edit expense"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            aria-label="Delete expense"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Expense"
      >
        <ExpenseForm 
          expenseId={expense.id} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      </Modal>
    </>
  );
};

export default ExpenseItem;