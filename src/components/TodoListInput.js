import React, { Component } from 'react';

class TodoInput extends Component {
  state = {
    newTask: { title: '', done: false }
  };
  changeNewTask = event => {
    let updatedNewTask = Object.assign({}, this.state.newTask);
    updatedNewTask.title = event.target.value;
    this.setState({ newTask: updatedNewTask });
  };
  createNewTask = () => {
    this.props.create(this.state.newTask);
    this.setState({ newTask: { title: '', done: false } });
  };
  render() {
    let btnStyle = 'new-task__buttonSubmit';

    if (this.state.newTask.title.length > 1) {
      btnStyle = 'new-task__buttonSubmit new-task__buttonSubmit__active';
    } else btnStyle = 'new-task__buttonSubmit';
    return (
      <div className="new-task">
        <input
          type="text"
          className="new-task__editor"
          value={this.state.newTask.title}
          onChange={event => this.changeNewTask(event)}
        />
        <button
          className={btnStyle}
          onClick={() => this.createNewTask()}
          disabled={this.state.newTask.title.length < 2}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
    );
  }
}

export default TodoInput;
