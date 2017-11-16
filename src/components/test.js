import React, { Component } from 'react';
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';
import Container from '../views/Post/Container';

export default class Test extends Component {
  render() {
    return (
      <Grid columns={2} divided>
        <GridRow>
          <GridColumn>
            <Container />
          </GridColumn>
          <GridColumn>
            <Container />
          </GridColumn>
        </GridRow>
        <GridRow>
          <Container />
        </GridRow>
      </Grid>
    );
  }
}
