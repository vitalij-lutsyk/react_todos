import React, { Component } from 'react';

class TodoInput extends Component {
  state = {
    newTask: ''
  };

  get isDisabled() {
    return this.state.newTask.length < 6;
  }

  handleChangeNewTask = event => {
    this.setState({ newTask: event.target.value });
  };

  createNewTask(e = null) {
    if (e.key !== 'Enter' || this.isDisabled) return;
    this.props.create({ title: this.state.newTask, done: false });
    this.setState({ newTask: '' });
  }

  render() {
    return (
      <div className="new-task">
        <input
          type="text"
          className="new-task__editor"
          value={this.state.newTask}
          onChange={this.handleChangeNewTask}
          onKeyPress={e => this.createNewTask(e)}
        />
        <button
          className="new-task__button-submit"
          onClick={this.createNewTask}
          disabled={this.isDisabled}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
    );
  }
}

export default TodoInput;
