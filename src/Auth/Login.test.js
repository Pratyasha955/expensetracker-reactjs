import { render, screen } from '@testing-library/react';
import { ExpenseProvider } from '../Store/ExpenseContext';
import store from '../Reducers/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './login';

test('renders Login  page  screen by default', () => {
    render(
        <Provider store={store}>
            <Router>
                <ExpenseProvider>
                    <Login />
                </ExpenseProvider>
            </Router>
        </Provider>
    );
    const ScreenElement = screen.getByText('Email:');
    expect(ScreenElement).toBeInTheDocument();
});

test('renders Login  page  screen by default', () => {
    render(
        <Provider store={store}>
            <Router>
                <ExpenseProvider>
                    <Login />
                </ExpenseProvider>
            </Router>
        </Provider>
    );
    const ScreenElement = screen.getByText('Password:');
    expect(ScreenElement).toBeInTheDocument();
});