import React from 'react';
import { Item, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { categoryPropType } from '../../reducer';
import './style.css';

<<<<<<< HEAD
const CategoryCard = (props) => {
  const { slug, id, name } = props.category;
  return (
    <Link to={'/category/' + slug + '/' + id}>
      <Item>
        <Item.Header as={Header}>
          <div dangerouslySetInnerHTML={{ __html: name }} />
        </Item.Header>
      </Item>
    </Link>
  );
};
=======
const CategoryCard = props => (
  <Link to={'/category/' + props.category.slug + '/' + props.category.id}>
    <Item>
      <Item.Header as={Header}>
        <h2 dangerouslySetInnerHTML={{ __html: props.category.name }} />
      </Item.Header>
    </Item>
  </Link>
);
>>>>>>> fb3683ab5c649ec7e4f3a29779717db044ce5ee0

CategoryCard.propTypes = {
  category: categoryPropType.isRequired,
};

export default CategoryCard;
