import React, { Component } from 'react';
import API from '../api/api.js';

class TodoInput extends Component {
  state = {
    newTask: ''
  };

  get isUnValid() {
    return this.state.newTask.length < 6;
  }

  handleChangeNewTask = event => {
    this.setState({ newTask: event.target.value });
  };

  handleCreateNewTask = (e = null) => {
    if (e.key !== 'Enter' || this.isUnValid) return;
    this.createNewTask({ title: this.state.newTask, done: false });
  };

  createNewTask = newTask => {
    API.post('/.json', newTask).then(res => {
      const newTodo = { id: res.data.name, ...newTask };
      this.props.added(newTodo);
      this.setState({ newTask: '' });
    });
  };

  render() {
    return (
      <div className="new-task">
        <input
          type="text"
          className="new-task__editor"
          value={this.state.newTask}
          onChange={this.handleChangeNewTask}
          onKeyPress={this.handleCreateNewTask}
        />
        <button className="new-task__button-submit" onClick={this.handleCreateNewTask} disabled={this.isUnValid}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
    );
  }
}

export default TodoInput;
