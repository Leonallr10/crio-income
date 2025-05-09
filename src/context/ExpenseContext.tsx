import React, { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Expense, ExpenseContextType } from '../types';
import { 
  getStoredBalance, 
  storeBalance, 
  getStoredExpenses, 
  storeExpenses 
} from '../utils/localStorage';

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(() => getStoredBalance());
  const [expenses, setExpenses] = useState<Expense[]>(() => getStoredExpenses());
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  // Calculate total expenses whenever expenses change
  useEffect(() => {
    const newTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpenses(newTotal);
  }, [expenses]);

  // Save to localStorage whenever balance or expenses change
  useEffect(() => {
    storeBalance(balance);
  }, [balance]);

  useEffect(() => {
    storeExpenses(expenses);
  }, [expenses]);

  const addIncome = (amount: number) => {
    if (amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    setBalance(prevBalance => prevBalance + amount);
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    if (expense.amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (expense.amount > balance) {
      alert('Insufficient balance');
      return;
    }

    const newExpense = {
      ...expense,
      id: uuidv4(),
    };

    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    setBalance(prevBalance => prevBalance - expense.amount);
  };

  const deleteExpense = (id: string) => {
    const expenseToDelete = expenses.find(expense => expense.id === id);
    
    if (!expenseToDelete) return;

    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    setBalance(prevBalance => prevBalance + expenseToDelete.amount);
  };

  const editExpense = (id: string, updatedExpense: Omit<Expense, 'id'>) => {
    const expenseToUpdate = expenses.find(expense => expense.id === id);
    
    if (!expenseToUpdate) return;

    // Calculate the difference in amount
    const amountDifference = expenseToUpdate.amount - updatedExpense.amount;
    
    // Check if user has enough balance for the updated expense
    if (amountDifference < 0 && Math.abs(amountDifference) > balance) {
      alert('Insufficient balance');
      return;
    }

    setExpenses(prevExpenses => 
      prevExpenses.map(expense => 
        expense.id === id 
          ? { ...updatedExpense, id } 
          : expense
      )
    );

    // Update balance based on the difference
    setBalance(prevBalance => prevBalance + amountDifference);
  };

  const value = {
    balance,
    expenses,
    totalExpenses,
    addIncome,
    addExpense,
    deleteExpense,
    editExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};