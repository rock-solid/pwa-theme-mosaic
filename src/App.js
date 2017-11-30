import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  render() {
    return <div className="App">{this.props.children}</div>;
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

App.defaultProps = {
  children: null,
};
