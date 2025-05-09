import { Expense } from '../types';

const BALANCE_KEY = 'expense-tracker-balance';
const EXPENSES_KEY = 'expense-tracker-expenses';

// Wallet Balance
export const getStoredBalance = (): number => {
  const storedBalance = localStorage.getItem(BALANCE_KEY);
  return storedBalance ? parseFloat(storedBalance) : 5000; // Default balance
};

export const storeBalance = (balance: number): void => {
  localStorage.setItem(BALANCE_KEY, balance.toString());
};

// Expenses
export const getStoredExpenses = (): Expense[] => {
  const storedExpenses = localStorage.getItem(EXPENSES_KEY);
  return storedExpenses ? JSON.parse(storedExpenses) : [];
};

export const storeExpenses = (expenses: Expense[]): void => {
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
};