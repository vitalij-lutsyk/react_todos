import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.inputChanged(event);
  }

  render() {
    // Prepared templates
    const itemTitle = <p>{this.props.title}</p>,
      itemCheckbox = (
        <input
          type="checkbox"
          className="task__mark"
          checked={this.props.done}
          onChange={() => this.props.update(this.props.id, this.props.title, !this.props.done)}
        />
      ),
      itemInput = (
        <input
          type="text"
          className="task__editor"
          value={this.props.activeEditItemValue}
          onChange={this.handleChange}
        />
      ),
      itemBtnEdit = (
        <button
          className="task__btn"
          onClick={() => this.props.changeEditMode(true, this.props.idx)}
        >
          <i className="far fa-edit"></i>
        </button>
      ),
      itemBtnSave = (
        <button
          className="task__btn"
          onClick={() =>
            this.props.update(this.props.id, this.props.activeEditItemValue, this.props.done)
          }
        >
          <i className="far fa-save"></i>
        </button>
      ),
      itemBtnDiscard = (
        <button className="task__btn" onClick={() => this.props.changeEditMode()}>
          <i className="fas fa-ban"></i>
        </button>
      ),
      itemBtnDelete = (
        <button className="task__btn" onClick={this.props.delete}>
          <i className="fas fa-trash"></i>
        </button>
      );

    // Switcher of buttons & input
    let itemBody = null,
      itemButtons = null;
    if (this.props.isEditMode && this.props.idx === this.props.activeEditItem) {
      itemBody = itemInput;
      itemButtons = [itemBtnSave, itemBtnDiscard, itemBtnDelete];
    } else {
      itemBody = itemTitle;
      itemButtons = [itemBtnEdit, itemBtnDelete];
    }

    // Final rendering
    return (
      <div className="task__item">
        {itemCheckbox}
        <div className="task__body">
          {itemBody}
          <div className="task__btns">{itemButtons}</div>
        </div>
      </div>
    );
  }
}

export default TodoItem;