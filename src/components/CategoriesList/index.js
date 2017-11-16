import React, { Component } from 'react';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import CategoryCard from '../CategoryCard/index';
import './style.css';

export default class CategoriesList extends Component {
  render() {
    const { categoriesList } = this.props;

    return (
      <div>
        {categoriesList.length % 3 === 0 ? (
          <Grid columns={2} divided>
            <GridRow>
              <GridColumn>
                <CategoryCard category={categoriesList[0]} key={Math.random()} />
              </GridColumn>
              <GridColumn>
                <CategoryCard category={categoriesList[1]} key={Math.random()} />
              </GridColumn>
            </GridRow>
            <GridRow>
              <CategoryCard category={categoriesList[2]} key={Math.random()} />
            </GridRow>
          </Grid>
        ) : categoriesList.length % 3 === 1 ? (
          <Grid>
            <GridRow>
              <CategoryCard category={categoriesList[0]} key={Math.random()} />
            </GridRow>
          </Grid>
        ) : (
          <Grid>
            <GridRow>
              <GridColumn>
                <CategoryCard category={categoriesList[0]} key={Math.random()} />
              </GridColumn>
              <GridColumn>
                <CategoryCard category={categoriesList[1]} key={Math.random()} />
              </GridColumn>
            </GridRow>
          </Grid>
        )}
      </div>
    );
  }
}

CategoriesList.propTypes = {
  categoriesList: PropTypes.array.isRequired,
};
