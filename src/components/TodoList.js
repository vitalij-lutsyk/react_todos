import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTodos } from '../store/actions/todosActions';

import TodoItem from './TodoListItem';
import TodoInput from './TodoListInput';
import TheHeader from './TheHeader.js';

class TodoList extends Component {
  state = {};

  UNSAFE_componentWillMount() {
    this.props.fetchTodos();
  }

  get filteredItems() {
    const todos = this.props.todoItems;
    switch (this.props.visibleTasks) {
      case 'done':
        return todos.filter(item => item.done);
      case 'act':
        return todos.filter(item => !item.done);
      default:
        return todos;
    }
  }

  get leftTasks() {
    const count = this.props.todoItems.filter(item => !item.done).length || 0;
    return count > 0 ? count + ' Items left' : 'All tasks are done!';
  }

  render() {
    return (
      <div className="page">
        <h1 className="page__title">What needs we done?</h1>
        <TheHeader leftTasks={this.leftTasks} visibleTasks={this.props.visibleTasks} />
        {this.filteredItems.map(item => (
          <TodoItem key={item.id} item={item} />
        ))}
        <TodoInput key="todoinput" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoItems: state.todos.todoItems ? state.todos.todoItems : [],
  visibleTasks: state.todos.visibleTasks ? state.todos.visibleTasks : ''
});

export default connect(mapStateToProps, { fetchTodos })(TodoList);
