import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

import FiveCards from './FiveCards';
import FourCards from './FourCards';
import ThreeCards from './ThreeCards';
import TwoCards from './TwoCards';
import OneCard from './OneCard';

export default class CategoriesList extends Component {
  getCards() {
    switch (this.props.prop.length % 5) {
    case 0:
      return <FiveCards categoriesList={this.props.prop} />;
    case 1:
      return <OneCard categoriesList={this.props.prop} />;
    case 2:
      return <TwoCards categoriesList={this.props.prop} />;
    case 3:
      return <ThreeCards categoriesList={this.props.prop} />;
    case 4:
      return <FourCards categoriesList={this.props.prop} />;
    default:
      return null;
    }
  }

  render() {
    return <div>{this.props.prop.length !== 0 ? this.getCards() : ''}</div>;
  }
}

CategoriesList.propTypes = {
  prop: PropTypes.array.isRequired,
};
