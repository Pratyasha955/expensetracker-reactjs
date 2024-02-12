import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);

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
                    setExpenses(fetchedExpenses);
                }
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    const addExpense = async (newExpense) => {
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
            const data = await response.json();
            setExpenses([...expenses, { id: data.name, ...newExpense }]);
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            const response = await fetch(`https://expensetracker-7fed8-default-rtdb.firebaseio.com/expense/${id}.json`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete expense');
            }
            setExpenses(expenses.filter((expense) => expense.id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error);
            throw error;
        }
    };

    const updateExpense = async (updatedExpense) => {
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
            setExpenses(expenses.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense)));
        } catch (error) {
            console.error('Error updating expense:', error);
            throw error;
        }
    };

    return (
        <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, updateExpense}}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpense = () => useContext(ExpenseContext);