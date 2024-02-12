import React from 'react';
import './ExpenseList.css';

const ExpenseList = ({ expenses }) => {
    return (
        <div className="expense-list">
            <h2>Expense List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={index} className="expense-item">
                            <td>${expense.amount}</td>
                            <td>{expense.description}</td>
                            <td>{expense.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;