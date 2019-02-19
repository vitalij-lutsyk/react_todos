import React, { Component } from 'react'
import API from '../api/api'
import TodoItem from './TodoListItem'
import TodoInput from './TodoListInput'
import cl from './task-list.scss'
class TodoList extends Component {
  state = {
    todoItems: [],
    isEditMode: false,
    activeEditItem: null,
    activeEditItemValue: null,
    visibleTasks: 'all',
    leftTasks: 0
  }

  // Work with API
  fetchTodos = () => {
    API.get('.json').then(res => {
      let data = Object.keys(res.data).map(id => {
        return {
          id: id,
          isDone:res.data[id].done,
          title: res.data[id].title
        }
      })
      this.setState({ todoItems: data })
      this.calculateLeftTasks()
    })
  }

  updateTask = (id, title = '', isDone = false) => {
    let updatingTask = { title: title, done: isDone }
    API.put(`${id}.json`, updatingTask).then(() => { this.fetchTodos() })
    this.changeEditMode()
  }

  deleteTask = (id) => {
    API.delete(`${id}.json`).then(() => { this.fetchTodos() })
  }

  createNewTask = (newTask) => {
    API.post('.json', newTask).then(() => { this.fetchTodos() })
  }

  // Local controls
  changeEditMode = (value = false, index = null) => {
    if (value && index !== null) this.setState({ activeEditItemValue: this.state.todoItems[index].title })
    else this.setState({ activeEditItemValue: null })
    this.setState({ isEditMode: value, activeEditItem: index })
  }

  // Handles user input in the todo
  inputChanged = (event) => {
    this.setState({ activeEditItemValue: event.target.value })
  }

  changeVisibleTasks = (value) => {
    this.setState({ visibleTasks: value })
  }

  calculateLeftTasks = () => {
    this.setState({ leftTasks: this.state.todoItems.filter((item) => !item.isDone).length})
  }

  // Fetching todos when page is start
  componentWillMount () {
    this.fetchTodos()
  }

  render() {
    const items = this.state.todoItems.map((item, index) => {
      const domItem = <TodoItem title={item.title}
                                isDone={item.isDone}
                                id={item.id}
                                idx={index}
                                isEditMode={this.state.isEditMode}
                                changeEditMode={this.changeEditMode}
                                activeEditItem={this.state.activeEditItem}
                                activeEditItemValue={this.state.activeEditItemValue}
                                inputChanged={(event) => this.inputChanged(event, index)}
                                update={this.updateTask}
                                delete={() => this.deleteTask(item.id)}
                                key={index}/>
      if (this.state.visibleTasks === 'done' && item.isDone) return domItem
      if (this.state.visibleTasks === 'act' && !item.isDone) return domItem
      if (this.state.visibleTasks === 'all') return domItem
      else return null
    })

    const btnStyle = cl.tasks__header_btn,
          btnStyleAct = [cl.tasks__header_btn__active, cl.tasks__header_btn].join(' ')

    return (
      <div className={cl.page}>
        <h1 className={cl.page__title}>What needs we done?</h1>
        <header className={cl.tasks__header}>
          <div className={cl.tasks__header_left_tasks}>
            <p>{ this.state.leftTasks > 0 ? this.state.leftTasks + ' Items left' : 'All tasks are done!'}</p>
          </div>
          <div className={cl.tasks__header_btns}>
            <button onClick={() => this.changeVisibleTasks('all')}
                    className={this.state.visibleTasks === 'all' ? btnStyleAct : btnStyle}>
              All
            </button>
            <button onClick={() => this.changeVisibleTasks('act')}
                    className={this.state.visibleTasks === 'act' ? btnStyleAct : btnStyle}>
              Active
            </button>
            <button onClick={() => this.changeVisibleTasks('done')}
                    className={this.state.visibleTasks === 'done' ? btnStyleAct : btnStyle}>
              Complited
            </button>
          </div>
        </header>
        {items}
        <TodoInput create={this.createNewTask} key="todoinput"/>
      </div>
    )
  }
}

export default TodoList;