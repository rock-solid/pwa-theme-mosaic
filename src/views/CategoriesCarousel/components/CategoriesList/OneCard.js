import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';

import { categoryPropType } from '../../reducer';
import CategoryCard from '../CategoryCard/index';
import './style.css';

const OneCard = props => (
  <Grid className="full-row">
    <GridRow>
      <GridColumn>
        <CategoryCard category={props.categoriesList[0]} key={props.categoriesList[0].id} />
      </GridColumn>
    </GridRow>
  </Grid>
);

OneCard.propTypes = {
  categoriesList: PropTypes.arrayOf(categoryPropType).isRequired,
};
export default OneCard;
