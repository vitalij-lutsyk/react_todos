import React, { Component } from 'react'
import cl from './task-input.scss'
class TodoInput extends Component {

  state ={
    newTask: { title: '', done: false }
  }
  changeNewTask = (event) => {
    let updatedNewTask = Object.assign({}, this.state.newTask)
    updatedNewTask.title = event.target.value
    this.setState({ newTask: updatedNewTask })
  }
  createNewTask = () => {
    this.props.create(this.state.newTask)
    this.setState({ newTask: { title: '', done: false }})
  }
  render() {
    let btnStyle = cl.newTask__buttonSubmit

    if (this.state.newTask.title.length > 1) {
      btnStyle = [cl.newTask__buttonSubmit, cl.newTask__buttonSubmit__active].join(' ')
    } else btnStyle = cl.newTask__buttonSubmit
    return (
      <div className={cl.newTask}>
        <input  type="text"
                className={cl.newTask__editor}
                value={this.state.newTask.title}
                onChange={(event) => this.changeNewTask(event)}/>
        <button className={btnStyle} onClick={() => this.createNewTask()}
                disabled={this.state.newTask.title.length < 2}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
    )
  }
}

export default TodoInput