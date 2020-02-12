import React, { Component } from 'react';
import API from '../api/api.js';
import TodoItem from './TodoListItem';
import TodoInput from './TodoListInput';

class TodoList extends Component {
  state = {
    todoItems: [],
    isEditMode: false,
    activeEditItem: null,
    activeEditItemValue: null,
    visibleTasks: 'all',
    leftTasks: 0
  };

  // Work with API
  fetchTodos = () => {
    API.get('.json')
      .then(res => {
        if (!res.data) return;
        else {
          let data = Object.keys(res.data).map(id => {
            return {
              id: id,
              done: res.data[id].done,
              title: res.data[id].title
            };
          });
          this.setState({ todoItems: data });
          this.calculateLeftTasks();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateTask = (id, title = '', done = false) => {
    API.put(`${id}/.json`, { title, done }).then(res => {
      const updatedTodos = this.state.todoItems.map(todo =>
        todo.id === id ? { id, ...res.data } : todo
      );
      this.setState({ todoItems: updatedTodos });
      this.calculateLeftTasks();
    });
    this.changeEditMode();
  };

  deleteTask = id => {
    API.delete(`${id}/.json`).then(() => {
      const updatedTodos = this.state.todoItems.filter(todo => todo.id !== id);
      this.setState({ todoItems: updatedTodos });
      this.calculateLeftTasks();
    });
  };

  createNewTask = newTask => {
    API.post('/.json', newTask).then(res => {
      const updatedTodos = this.state.todoItems.concat({ id: res.data.name, ...newTask });
      this.setState({ todoItems: updatedTodos });
      this.calculateLeftTasks();
    });
  };

  // Local controls
  changeEditMode = (value = false, index = null) => {
    if (value && index !== null)
      this.setState({ activeEditItemValue: this.state.todoItems[index].title });
    else this.setState({ activeEditItemValue: null });
    this.setState({ isEditMode: value, activeEditItem: index });
  };

  // Handles user input in the todo
  inputChanged = event => {
    this.setState({ activeEditItemValue: event.target.value });
  };

  changeVisibleTasks = value => {
    this.setState({ visibleTasks: value });
  };

  calculateLeftTasks = () => {
    if (this.state.todoItems.length) {
      this.setState({ leftTasks: this.state.todoItems.filter(item => !item.done).length });
    } else {
      this.setState({ leftTasks: 0 });
    }
  };

  // Fetching todos when page is start
  componentWillMount() {
    this.fetchTodos();
  }

  render() {
    const items = this.state.todoItems.map((item, index) => {
      const domItem = (
        <TodoItem
          title={item.title}
          done={item.done}
          id={item.id}
          idx={index}
          isEditMode={this.state.isEditMode}
          changeEditMode={this.changeEditMode}
          activeEditItem={this.state.activeEditItem}
          activeEditItemValue={this.state.activeEditItemValue}
          inputChanged={event => this.inputChanged(event, index)}
          update={this.updateTask}
          delete={() => this.deleteTask(item.id)}
          key={index}
        />
      );
      if (this.state.visibleTasks === 'done' && item.done) return domItem;
      if (this.state.visibleTasks === 'act' && !item.done) return domItem;
      if (this.state.visibleTasks === 'all') return domItem;
      else return null;
    });

    const btnStyle = 'tasks__header_btn',
      btnStyleAct = 'tasks__header_btn__active tasks__header_btn';

    return (
      <div className="page">
        <h1 className="page__title">What needs we done?</h1>
        <header className="tasks__header">
          <div className="tasks__header_left_tasks">
            <p>
              {this.state.leftTasks > 0
                ? this.state.leftTasks + ' Items left'
                : 'All tasks are done!'}
            </p>
          </div>
          <div className="tasks__header_btns">
            <button
              onClick={() => this.changeVisibleTasks('all')}
              className={this.state.visibleTasks === 'all' ? btnStyleAct : btnStyle}
            >
              All
            </button>
            <button
              onClick={() => this.changeVisibleTasks('act')}
              className={this.state.visibleTasks === 'act' ? btnStyleAct : btnStyle}
            >
              Active
            </button>
            <button
              onClick={() => this.changeVisibleTasks('done')}
              className={this.state.visibleTasks === 'done' ? btnStyleAct : btnStyle}
            >
              Complited
            </button>
          </div>
        </header>
        {items}
        <TodoInput create={this.createNewTask} key="todoinput" />
      </div>
    );
  }
}

export default TodoList;
