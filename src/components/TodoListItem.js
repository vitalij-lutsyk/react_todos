import React, { Component } from 'react';
import API from '../api/api.js';

class TodoItem extends Component {
  state = {};

  componentDidMount() {
    this.setState({ ...this.props.item, isEditing: false });
  }

  handleStartEditing = () => {
    this.setState({ titleBackup: this.state.title });
    this.setState({ isEditing: true });
  };

  handleEdit = e => {
    this.setState({ title: e.target.value });
  };

  handleSave = () => {
    const { id, title, done } = this.state;
    this.updateTask(id, title, done);
  };

  handleDiscard = () => {
    this.setState({ isEditing: false, title: this.state.titleBackup });
  };

  handleDone = e => {
    const { id, title } = this.state;
    this.updateTask(id, title, e.target.checked);
  };

  updateTask = (id, title = '', done = false) => {
    API.put(`${id}/.json`, { title, done }).then(res => {
      this.props.updated({ id, ...res.data });
      this.setState({ ...res.data, isEditing: false });
    });
  };

  deleteTask = () => {
    API.delete(`${this.state.id}/.json`).then(() => {
      this.props.deleted(this.state.id);
    });
  };

  get todoBody() {
    if (this.state.isEditing) {
      return <input type="text" className="task__editor" value={this.state.title} onChange={this.handleEdit} />;
    } else {
      return <p>{this.state.title}</p>;
    }
  }

  get todoBtns() {
    if (this.state.isEditing) {
      return (
        <>
          <button className="task__btn" onClick={this.handleSave}>
            <i className="far fa-save"></i>
          </button>
          <button className="task__btn" onClick={this.handleDiscard}>
            <i className="fas fa-ban"></i>
          </button>
        </>
      );
    } else {
      return (
        <button className="task__btn" onClick={this.handleStartEditing}>
          <i className="far fa-edit"></i>
        </button>
      );
    }
  }

  render() {
    return (
      <div className="task__item">
        <input type="checkbox" className="task__mark" checked={this.state.done || false} onChange={this.handleDone} />
        <div className="task__body">
          {this.todoBody}
          <div className="task__btns">
            {this.todoBtns}
            <button className="task__btn" onClick={this.deleteTask}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoItem;
