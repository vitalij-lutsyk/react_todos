import { SET_TODOS, SET_VISIBLE } from '../constants';

const initialState = {
  todoItems: [],
  visibleTasks: 'all'
};

export default function todos(state = initialState, { type, payload }) {
  switch (type) {
    case SET_TODOS:
      return { ...state, todoItems: payload };
    case SET_VISIBLE:
      return { ...state, visibleTasks: payload };
    default:
      return state;
  }
}
