import React from 'react';
import WalletBalance from './WalletBalance';
import ExpenseTotal from './ExpenseTotal';
import ExpenseSummary from './ExpenseSummary';
import ExpenseList from './ExpenseList';
import ExpenseTrends from './ExpenseTrends';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <WalletBalance />
        </div>
        <div className="lg:col-span-1">
          <ExpenseTotal />
        </div>
        <div className="lg:col-span-1">
          <ExpenseSummary />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ExpenseList />
        </div>
        <div>
          <ExpenseTrends />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;