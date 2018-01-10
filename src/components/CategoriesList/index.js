import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
import { categoryPropType } from '../../views/CategoriesCarousel/reducer';
import FiveCards from './FiveCards';
import FourCards from './FourCards';
import ThreeCards from './ThreeCards';
import TwoCards from './TwoCards';
import OneCard from './OneCard';

const CategoriesList = (props) => {
  function getCards() {
    switch (props.categoriesChunk.length % 5) {
    case 0:
      return <FiveCards categoriesList={props.categoriesChunk} />;
    case 1:
      return <OneCard categoriesList={props.categoriesChunk} />;
    case 2:
      return <TwoCards categoriesList={props.categoriesChunk} />;
    case 3:
      return <ThreeCards categoriesList={props.categoriesChunk} />;
    case 4:
      return <FourCards categoriesList={props.categoriesChunk} />;
    default:
      return null;
    }
  }

  return <div>{props.categoriesChunk.length !== 0 ? getCards() : ''}</div>;
};

CategoriesList.propTypes = {
  categoriesChunk: PropTypes.arrayOf(categoryPropType).isRequired,
};

export default CategoriesList;
