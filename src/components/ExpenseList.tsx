import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import ExpenseItem from './ExpenseItem';

const ExpenseList: React.FC = () => {
  const { expenses } = useExpense();

  if (expenses.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Recent Transactions</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center py-6">No expenses yet. Add your first expense!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Recent Transactions</h2>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {expenses.slice().reverse().map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;