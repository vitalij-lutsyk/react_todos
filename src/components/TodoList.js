import React, { Component } from 'react';
import API from '../api/api.js';
import TodoItem from './TodoListItem';
import TodoInput from './TodoListInput';
import TheHeader from './TheHeader.js';

class TodoList extends Component {
  state = {
    todoItems: [],
    visibleTasks: 'all'
  };

  componentWillMount() {
    this.fetchTodos();
  }

  get filteredItems() {
    const todos = this.state.todoItems;
    switch (this.state.visibleTasks) {
      case 'done':
        return todos.filter(item => item.done);
      case 'act':
        return todos.filter(item => !item.done);
      default:
        return todos;
    }
  }

  get leftTasks() {
    const count = this.state.todoItems.filter(item => !item.done).length || 0;
    return count > 0 ? count + ' Items left' : 'All tasks are done!';
  }

  fetchTodos = () => {
    API.get('.json')
      .then(res => {
        if (!res.data) {
          this.setState({ todoItems: [] });
        } else {
          let data = Object.keys(res.data).map(id => ({ id, ...res.data[id] }));
          this.setState({ todoItems: data });
        }
      })
      .catch(err => console.log(err));
  };

  changeVisible = value => {
    this.setState({ visibleTasks: value });
  };

  update = updatedTodo => {
    const updatedTodos = this.state.todoItems.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo));
    this.setState({ todoItems: updatedTodos });
  };

  delete = deletedTaskId => {
    const updatedTodos = this.state.todoItems.filter(({ id }) => id !== deletedTaskId);
    this.setState({ todoItems: updatedTodos });
  };

  addNew = todo => {
    const todoItems = this.state.todoItems.slice();
    todoItems.push(todo);
    this.setState({ todoItems });
  };

  render() {
    return (
      <div className="page">
        <h1 className="page__title">What needs we done?</h1>
        <TheHeader leftTasks={this.leftTasks} visibleTasks={this.state.visibleTasks} update={this.changeVisible} />
        {this.filteredItems.map(item => (
          <TodoItem key={item.id} item={item} updated={this.update} deleted={this.delete} />
        ))}
        <TodoInput create={this.createNewTask} key="todoinput" added={this.addNew} />
      </div>
    );
  }
}

export default TodoList;
