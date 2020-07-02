import React from 'react';
import './Square.css';

const Square = (props) => {
  return (
    <button
      className="square"
      onClick={() => props.onClick()}
      style={{ backgroundColor: props.value }}
      disabled={props.disabled}
    >
    </button>
  );
};

export default Square;