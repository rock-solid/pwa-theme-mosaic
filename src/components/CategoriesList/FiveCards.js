import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';

import { categoryPropType } from '../../views/CategoriesCarousel/reducer';
import CategoryCard from '../CategoryCard/index';

const FiveCards = props => (
  <Grid columns={2} divided className="one-third-row">
    <GridRow>
      <GridColumn>
        <CategoryCard category={props.categoriesList[0]} key={props.categoriesList[0].id} />
      </GridColumn>
    </GridRow>
    <GridRow>
      <GridColumn>
        <CategoryCard category={props.categoriesList[1]} key={props.categoriesList[1].id} />
      </GridColumn>
      <GridColumn>
        <CategoryCard category={props.categoriesList[2]} key={props.categoriesList[2].id} />
      </GridColumn>
    </GridRow>
    <GridRow>
      <GridColumn>
        <CategoryCard category={props.categoriesList[3]} key={props.categoriesList[3].id} />
      </GridColumn>
      <GridColumn>
        <CategoryCard category={props.categoriesList[4]} key={props.categoriesList[4].id} />
      </GridColumn>
    </GridRow>
  </Grid>
);

FiveCards.propTypes = {
  categoriesList: PropTypes.arrayOf(categoryPropType).isRequired,
};

export default FiveCards;
