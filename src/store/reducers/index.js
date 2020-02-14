import { combineReducers } from 'redux';
import todos from './todosReducer';

const rootReducer = combineReducers({ todos });

export default rootReducer;
