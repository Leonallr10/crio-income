export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export interface ExpenseContextType {
  balance: number;
  expenses: Expense[];
  totalExpenses: number;
  addIncome: (amount: number) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  editExpense: (id: string, updatedExpense: Omit<Expense, 'id'>) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface AddIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type CategoryColors = {
  [key: string]: string;
};