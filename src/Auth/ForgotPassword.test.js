import { render, screen } from '@testing-library/react';
import ForgotPassword from './forgot';
import store from '../Reducers/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders Forgot password  screen by default', () => {
  render(
    <Provider store={store}>
      <Router> 
        <ForgotPassword />
      </Router>
    </Provider>
  );
  const ScreenElement = screen.getByText('Forgot Password');
  expect(ScreenElement).toBeInTheDocument();
});