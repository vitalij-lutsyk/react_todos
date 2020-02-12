import React from 'react';

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
        <button onClick={() => props.update('all')} className={getStyle('all')}>
          All
        </button>
        <button onClick={() => props.update('act')} className={getStyle('act')}>
          Active
        </button>
        <button onClick={() => props.update('done')} className={getStyle('done')}>
          Complited
        </button>
      </div>
    </header>
  );
};

export default TheHeader;
