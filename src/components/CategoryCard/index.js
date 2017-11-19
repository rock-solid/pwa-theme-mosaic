import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Header } from 'semantic-ui-react';
import './style.css';

export default class CategoryCard extends Component {
  render() {
    const { category } = this.props;
    return (
      <div>
        <Item>
          <Item.Header as={Header}>{category.name}</Item.Header>
        </Item>
      </div>
    );
  }
}

CategoryCard.propTypes = {
  category: PropTypes.object.isRequired,
};
CategoryCard.defaultProps = {
  tall: 0,
};
