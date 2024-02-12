import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExpenses, deleteExpense, updateExpense } from '../Reducers/expensesReducer';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const dispatch = useDispatch();
    const expenses = useSelector(state => state.expenses.expenses);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch('https://expensetracker-7fed8-default-rtdb.firebaseio.com/expense.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch expenses');
                }
                const data = await response.json();
                if (data) {
                    const fetchedExpenses = Object.keys(data).map(key => ({
                        id: key,
                        ...data[key]
                    }));
                    dispatch(setExpenses(fetchedExpenses));
                }
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, [dispatch]);

    const fetchExpenses = async () => {
        try {
            const response = await fetch('https://expensetracker-7fed8-default-rtdb.firebaseio.com/expense.json');
            if (!response.ok) {
                throw new Error('Failed to fetch expenses');
            }
            const data = await response.json();
            if (data) {
                const fetchedExpenses = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                return fetchedExpenses;
            }
            return [];
        } catch (error) {
            console.error('Error fetching expenses:', error);
            throw error;
        }
    };

    const addExpenseHandler = async (newExpense) => {
        try {
            const response = await fetch('https://expensetracker-7fed8-default-rtdb.firebaseio.com/expense.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newExpense),
            });

            if (!response.ok) {
                throw new Error('Failed to add expense');
            }
            const updatedExpenses = await fetchExpenses();
            dispatch(setExpenses(updatedExpenses));
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const deleteExpenseHandler = async (id) => {
        try {
            const response = await fetch(`https://expensetracker-7fed8-default-rtdb.firebaseio.com/expense/${id}.json`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete expense');
            }

            const updatedExpenses = expenses.filter((expense) => expense.id !== id);
            dispatch(deleteExpense(updatedExpenses));
        } catch (error) {
            console.error('Error deleting expense:', error);
            throw error;
        }
    };

    const updateExpenseHandler = async (updatedExpense) => {
        try {
            const response = await fetch(`https://expensetracker-7fed8-default-rtdb.firebaseio.com/expense/${updatedExpense.id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedExpense),
            });

            if (!response.ok) {
                throw new Error('Failed to update expense');
            }

            const updatedExpenses = expenses.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense));
            dispatch(updateExpense(updatedExpenses));
        } catch (error) {
            console.error('Error updating expense:', error);
            throw error;
        }
    };

    return (
        <ExpenseContext.Provider value={{ expenses, addExpense: addExpenseHandler, deleteExpense: deleteExpenseHandler, updateExpense: updateExpenseHandler }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpense = () => useContext(ExpenseContext);
