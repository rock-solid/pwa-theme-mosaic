import React from 'react';
import { Item, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { categoryPropType } from '../../reducer';
import './style.css';

const CategoryCard = (props) => {
  const { slug, id, name } = props.category;
  return (
    <Link to={'/category/' + slug + '/' + id}>
      <Item>
        <Item.Header as={Header}>
          <h1 dangerouslySetInnerHTML={{ __html: name }} />
        </Item.Header>
      </Item>
    </Link>
  );
};

CategoryCard.propTypes = {
  category: categoryPropType.isRequired,
};

export default CategoryCard;
