import React, { useState } from 'react';
import ExpenseList from './ExpenseList';
import './Expense.css';
import { useExpense } from '../Store/ExpenseContext';
const Expense = () => {
    const { expenses, addExpense  } = useExpense();
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
            const newExpense = {
                amount,
                description,
                category
            };
            addExpense(newExpense);
            setAmount('');
            setDescription('');
            setCategory('');
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
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
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                    </select>
                </div>
                <div className="form-buttons">
                    <button className="form-button de-submit" type="submit">Submit</button>
                </div>
            </form>
            <ExpenseList expenses={expenses} />
        </div>
    );
};

export default Expense;
