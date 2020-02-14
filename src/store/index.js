import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const configureStore = initialState =>
  createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

const store = configureStore();

export default store;
