import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';

import CategoryCard from '../CategoryCard/index';

const ThreeCards = props => (
  <Grid columns={2} divided>
    <GridRow>
      <GridColumn>
        <CategoryCard category={props.categoriesList[0]} key={Math.random()} />
      </GridColumn>
    </GridRow>
    <GridRow>
      <GridColumn>
        <CategoryCard category={props.categoriesList[1]} tall={1} key={Math.random()} />
      </GridColumn>
      <GridColumn>
        <CategoryCard category={props.categoriesList[2]} tall={1} key={Math.random()} />
      </GridColumn>
    </GridRow>
  </Grid>
);

ThreeCards.propTypes = {
  categoriesList: PropTypes.array.isRequired,
};

export default ThreeCards;
