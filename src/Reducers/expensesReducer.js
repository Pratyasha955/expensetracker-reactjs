import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    expenses: [],
  },
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    deleteExpense: (state, action) => {
      state.expenses = action.payload;
    },
    updateExpense: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const { setExpenses, addExpense, deleteExpense, updateExpense } = expenseSlice.actions;
export default expenseSlice.reducer;