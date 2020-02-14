import API from '../../api/api';
import { SET_TODOS, SET_VISIBLE } from '../constants';

export const fetchTodos = () => async (dispatch, getState) => {
  API.get('.json')
    .then(res => {
      let data = res.data ? Object.keys(res.data).map(id => ({ id, ...res.data[id], isEditing: false })) : [];
      dispatch({
        type: SET_TODOS,
        payload: data
      });
    })
    .catch(err => console.error(err));
};

export const addNewTask = newTask => async (dispatch, getState) => {
  return API.post('/.json', newTask)
    .then(res => {
      const todos = getState().todos.todoItems.concat({ id: res.data.name, ...newTask, isEditing: false });
      dispatch({
        type: SET_TODOS,
        payload: todos
      });
    })
    .catch(err => console.error(err));
};

export const updateTask = (id, title = '', done = false) => async (dispatch, getState) => {
  return API.put(`${id}/.json`, { title, done })
    .then(res => {
      const updatedTodo = { id, ...res.data, isEditing: false };
      const updatedTodos = getState().todos.todoItems.map(todo => (todo.id === id ? updatedTodo : todo));
      dispatch({
        type: SET_TODOS,
        payload: updatedTodos
      });
      return updatedTodo;
    })
    .catch(err => console.error(err));
};

export const deleteTask = id => async (dispatch, getState) => {
  API.delete(`${id}/.json`)
    .then(() => {
      const updatedTodos = getState().todos.todoItems.filter(todo => todo.id !== id);
      dispatch({
        type: SET_TODOS,
        payload: updatedTodos
      });
    })
    .catch(err => console.error(err));
};

export const changeVisibleTasks = data => (dispatch, setState) => {
  dispatch({
    type: SET_VISIBLE,
    payload: data
  });
};
