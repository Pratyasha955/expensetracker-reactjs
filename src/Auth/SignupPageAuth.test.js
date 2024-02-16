import { render, screen } from '@testing-library/react';
import SignupPage from './signup';
import store from '../Reducers/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders Signup Page  screen by default', () => {
  render(
    <Provider store={store}>
      <Router> 
        <SignupPage />
      </Router>
    </Provider>
  );
  const ScreenElement = screen.getByText('Already have an account?');
  expect(ScreenElement).toBeInTheDocument();
});