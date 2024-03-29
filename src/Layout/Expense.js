import React, { useState, useEffect, useReducer } from 'react';
import ExpenseList from './ExpenseList';
import './Expense.css';
import { useExpense } from '../Store/ExpenseContext';
const Expense = () => {
    const { expenses, addExpense, updateExpense, deleteExpense  } = useExpense();
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [editingExpense, setEditingExpense] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [darkMode, toggleDarkMode] = useReducer((state) => !state, false);
    const [isPremiumActivated, setIsPremiumActivated] = useState(false);
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        const calculateTotalExpenses = () => {
            const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
            setTotalExpenses(total);
        };

        calculateTotalExpenses();
    }, [expenses]);

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingExpense) {
            handleUpdate();
        } else {
            const newExpense = {
                amount,
                description,
                category
            };
            addExpense(newExpense);
            setAmount('');
            setDescription('');
            setCategory('');
        }
        setEditingExpense(null);
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense);
        setAmount(expense.amount);
        setDescription(expense.description);
        setCategory(expense.category);
    };

    const handleUpdate = async () => {
        const updatedExpense = {
            id: editingExpense.id,
            amount,
            description,
            category,
        };
        try {
            await updateExpense(updatedExpense);
            setAmount('');
            setDescription('');
            setCategory('');
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            console.log('Expense successfully deleted');
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };
    
    const toggleActivatePremium = () => {
        setIsPremiumActivated(!isPremiumActivated);
    };

    const handleDownloadCSV = (data) => {
        const csvContent = "data:text/csv;charset=utf-8," +
            data.map((expense) => Object.values(expense).join(",")).join("\n");
        const encodedURI = encodeURI(csvContent);
        const link = document.createElement("a");
        link.href = encodedURI;
        link.download = "expenses.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="expense-container">
            <form className="expense-form" onSubmit={handleSubmit}>

                <h2>Daily Expenses</h2>
                <div className="form-row">
                    <label className="form-label" htmlFor="amount">Amount:</label>
                    <input
                        type="text"
                        id="amount"
                        className="form-input"
                        value={amount}
                        onChange={handleAmountChange}
                    />
                </div>
                <div className="form-row">
                    <label className="form-label" htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        className="form-input"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div className="form-row">
                    <label className="form-label" htmlFor="category">Category:</label>
                    <select id="category" className="form-select" value={category} onChange={handleCategoryChange}>
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Rent">Rent</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                    </select>
                </div>
                <div className="form-buttons">
                    <button className="form-button de-submit" type="submit">{editingExpense ? 'Update' : 'Submit'}</button>
                </div>
            </form>
            {totalExpenses > 10000 && (
                <button className="activate-premium-button" onClick={toggleActivatePremium}>
                    {isPremiumActivated ? 'Close Premium' : 'Activate Premium'}
                </button>
            )}
            {isPremiumActivated && (
                <div>
                    <button className="download-button" onClick={() => handleDownloadCSV(expenses)}>
                        Download Expenses as CSV
                    </button>
                    <button className="theme-toggle-button" onClick={toggleDarkMode}>
                        {darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                    </button>
                </div>
            )}
            <ExpenseList expenses={expenses} handleEdit={handleEdit} handleDelete={handleDelete}/>
            
        </div>
    );
};

export default Expense;
