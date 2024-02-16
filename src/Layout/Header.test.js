import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../Store/AuthContext';
import store from '../Reducers/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

test('renders Header by default', () => {
    render(
        <Provider store={store}>
            <Router>
                <AuthProvider>
                    <Header />
                </AuthProvider>
            </Router>
        </Provider>
    );
    const ScreenElement = screen.getByText('Expense Tracker');
    expect(ScreenElement).toBeInTheDocument();
});