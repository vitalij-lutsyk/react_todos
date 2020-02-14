import React from 'react';
import { connect } from 'react-redux';

import { changeVisibleTasks } from '../store/actions/todosActions';

const TheHeader = props => {
  function getStyle(target) {
    return props.visibleTasks === target ? 'header__btn is-active' : 'header__btn';
  }

  return (
    <header className="header">
      <div className="header__left-tasks">
        <p>{props.leftTasks}</p>
      </div>
      <div className="header_btns">
        <button onClick={() => props.changeVisibleTasks('all')} className={getStyle('all')}>
          All
        </button>
        <button onClick={() => props.changeVisibleTasks('act')} className={getStyle('act')}>
          Active
        </button>
        <button onClick={() => props.changeVisibleTasks('done')} className={getStyle('done')}>
          Complited
        </button>
      </div>
    </header>
  );
};

export default connect(null, { changeVisibleTasks })(TheHeader);
