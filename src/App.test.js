import { render, screen } from '@testing-library/react';
import App from './App';
import store from './Reducers/store';
import { Provider } from 'react-redux';

test('renders starts by default', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const ScreenElement = screen.getByText('Expense Tracker');
  expect(ScreenElement).toBeInTheDocument();
});

