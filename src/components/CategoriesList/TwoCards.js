import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';

import { categoryPropType } from '../../views/CategoriesCarousel/reducer';
import CategoryCard from '../CategoryCard/index';

const TwoCards = props => (
  <Grid columns={1} divided className="half-row">
    <GridRow>
      <GridColumn>
        <CategoryCard category={props.categoriesList[0]} key={props.categoriesList[0].id} />
      </GridColumn>
    </GridRow>
    <GridRow>
      <GridColumn>
        <CategoryCard category={props.categoriesList[1]} key={props.categoriesList[1].id} />
      </GridColumn>
    </GridRow>
  </Grid>
);

TwoCards.propTypes = {
  categoriesList: PropTypes.arrayOf(categoryPropType).isRequired,
};

export default TwoCards;
