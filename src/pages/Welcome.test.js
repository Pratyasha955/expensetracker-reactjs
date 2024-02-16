import { render, screen } from '@testing-library/react';
import Home from './welcome';
import { ExpenseProvider } from '../Store/ExpenseContext';
import store from '../Reducers/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders Welcome page  screen by default', () => {
    render(
        <Provider store={store}>
            <Router>
                <ExpenseProvider>
                    <Home />
                </ExpenseProvider>
            </Router>
        </Provider>
    );
    const ScreenElement = screen.getByText('Welcome To ExpenceTracker');
    expect(ScreenElement).toBeInTheDocument();
});