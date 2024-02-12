import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer';
import expensesReducer from './expensesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
});

const store = createStore(rootReducer);

export default store;