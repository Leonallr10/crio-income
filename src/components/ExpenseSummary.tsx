import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useExpense } from '../context/ExpenseContext';
import { groupExpensesByCategory, getCategoryColor } from '../utils/helpers';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseSummary: React.FC = () => {
  const { expenses } = useExpense();
  const chartRef = useRef<ChartJS<"pie", number[], string>>(null);

  const expensesByCategory = groupExpensesByCategory(expenses);
  const categories = Object.keys(expensesByCategory);
  
  const data = {
    labels: categories,
    datasets: [
      {
        data: categories.map(category => expensesByCategory[category]),
        backgroundColor: categories.map(category => getCategoryColor(category)),
        borderColor: categories.map(() => 'rgba(255, 255, 255, 0.6)'),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#f1f5f9', // Slate-100
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ₹${value} (${percentage}%)`;
          }
        }
      }
    },
  };

  // If no expenses, show placeholder
  if (expenses.length === 0) {
    return (
      <div className="bg-gray-700 rounded-lg shadow-md p-6 flex flex-col items-center justify-center" style={{ height: '300px' }}>
        <h2 className="text-xl font-bold mb-2 text-white">Expense Summary</h2>
        <p className="text-gray-300 text-center">No expense data to display</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Expense Summary</h2>
      <div style={{ height: '250px' }}>
        <Pie ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseSummary;