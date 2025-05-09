import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useExpense } from '../context/ExpenseContext';
import { groupExpensesByCategory, getCategoryColor } from '../utils/helpers';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseTrends: React.FC = () => {
  const { expenses } = useExpense();
  
  const expensesByCategory = groupExpensesByCategory(expenses);
  const categories = Object.keys(expensesByCategory);
  
  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Amount Spent',
        data: categories.map(category => expensesByCategory[category]),
        backgroundColor: categories.map(category => getCategoryColor(category)),
        borderColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#f1f5f9', // Slate-100
          callback: function(value: number) {
            return '₹' + value;
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        }
      },
      x: {
        ticks: {
          color: '#f1f5f9', // Slate-100
        },
        grid: {
          display: false,
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Amount: ₹${context.raw}`;
          }
        }
      }
    },
  };

  // If no expenses, show placeholder
  if (expenses.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center" style={{ height: '300px' }}>
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">Top Expenses</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center">No expense data to display</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Top Expenses</h2>
      <div style={{ height: '250px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseTrends;