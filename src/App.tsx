import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header />
        <main className="flex-1">
          <Dashboard />
        </main>
        <footer className="text-center py-4 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Expense Tracker App
        </footer>
      </div>
    </ExpenseProvider>
  );
}

export default App;