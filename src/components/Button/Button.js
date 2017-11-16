import React from 'react';

const Button = () => (
  <div>
    <div className="ui labeled button">
      <button className="ui red button" tabIndex="0">
        <i aria-hidden="true" className="heart icon" /> Like
      </button>
      <div className="ui red left pointing basic label">2,048</div>
    </div>
    <div className="ui labeled button">
      <button className="ui blue basic button" tabIndex="0">
        <i aria-hidden="true" className="fork icon" /> Fork
      </button>
      <a className="ui blue left pointing basic label">1,048</a>
    </div>
  </div>
);

export default Button;
