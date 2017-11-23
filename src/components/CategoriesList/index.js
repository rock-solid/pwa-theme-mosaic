import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';
import { categoryPropType } from '../../views/CategoriesCarousel/reducer';
import FiveCards from './FiveCards';
import FourCards from './FourCards';
import ThreeCards from './ThreeCards';
import TwoCards from './TwoCards';
import OneCard from './OneCard';

export default class CategoriesList extends Component {
  getCards() {
    switch (this.props.categoriesChunk.length % 5) {
    case 0:
      return <FiveCards categoriesList={this.props.categoriesChunk} />;
    case 1:
      return <OneCard categoriesList={this.props.categoriesChunk} />;
    case 2:
      return <TwoCards categoriesList={this.props.categoriesChunk} />;
    case 3:
      return <ThreeCards categoriesList={this.props.categoriesChunk} />;
    case 4:
      return <FourCards categoriesList={this.props.categoriesChunk} />;
    default:
      return null;
    }
  }

  render() {
    return <div>{this.props.categoriesChunk.length !== 0 ? this.getCards() : ''}</div>;
  }
}

CategoriesList.propTypes = {
  categoriesChunk: PropTypes.arrayOf(categoryPropType).isRequired,
};
