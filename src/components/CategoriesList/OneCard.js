import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridRow } from 'semantic-ui-react';

import CategoryCard from '../CategoryCard/index';
import './style.css';

const OneCard = props => (
  <Grid>
    <GridRow>
      <CategoryCard category={props.categoriesList[0]} key={Math.random()} />
    </GridRow>
  </Grid>
);

OneCard.propTypes = {
  categoriesList: PropTypes.object.isRequired,
};
export default OneCard;
