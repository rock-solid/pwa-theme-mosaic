import React from 'react';
import { Grid, GridRow } from 'semantic-ui-react';

import { categoryPropType } from '../../views/CategoriesCarousel/reducer';
import CategoryCard from '../CategoryCard/index';
import './style.css';

const OneCard = props => (
  <Grid className="full-row">
    <GridRow>
      <CategoryCard category={props.categoriesList[0]} key={Math.random()} />
    </GridRow>
  </Grid>
);

OneCard.propTypes = {
  categoriesList: categoryPropType.isRequired,
};
export default OneCard;
