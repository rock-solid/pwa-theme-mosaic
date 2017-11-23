import React, { Component } from 'react';
import { Item, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { categoryPropType } from '../../views/CategoriesCarousel/reducer';
import './style.css';

export default class CategoryCard extends Component {
  render() {
    const { category } = this.props;
    return (
      <Link to={'/category/' + category.slug + '/' + category.id}>
        <Item>
          <Item.Header as={Header}>{category.name}</Item.Header>
        </Item>
      </Link>
    );
  }
}

CategoryCard.propTypes = {
  category: categoryPropType.isRequired,
};
CategoryCard.defaultProps = {
  tall: 0,
};
