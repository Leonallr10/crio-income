import { Expense, CategoryColors } from '../types';

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString()}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export const groupExpensesByCategory = (expenses: Expense[]): Record<string, number> => {
  return expenses.reduce((acc: Record<string, number>, expense) => {
    const { category, amount } = expense;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});
};

export const CATEGORY_COLORS: CategoryColors = {
  'Food': '#9333ea', // Purple
  'Rent': '#f97316', // Orange
  'Utilities': '#3b82f6', // Blue
  'Entertainment': '#f59e0b', // Amber
  'Travel': '#eab308', // Yellow
  'Shopping': '#ec4899', // Pink
  'Health': '#10b981', // Emerald
  'Education': '#6366f1', // Indigo
  'Other': '#64748b', // Slate
};

export const CATEGORIES = [
  'Food',
  'Rent',
  'Utilities',
  'Entertainment',
  'Travel',
  'Shopping',
  'Health',
  'Education',
  'Other',
];

export const getCategoryColor = (category: string): string => {
  return CATEGORY_COLORS[category] || '#64748b'; // Default color if category not found
};

export const getTopExpenses = (expenses: Expense[], limit = 5): Expense[] => {
  return [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
};