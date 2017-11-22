import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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
  category: PropTypes.object.isRequired,
};
CategoryCard.defaultProps = {
  tall: 0,
};
