import React from 'react';
import './ExpenseList.css';

const ExpenseList = ({ expenses, handleEdit, handleDelete }) => {
    return (
        <div className="expense-list">
            <h2>Expense List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={index} className="expense-item">
                            <td>${expense.amount}</td>
                            <td>{expense.description}</td>
                            <td>{expense.category}</td>
                            <td><button className='edit-button' onClick={() => handleEdit(expense)}>Edit</button></td>
                            <td><button className='delete-button' onClick={() => handleDelete(expense.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;