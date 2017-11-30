import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, GridColumn, GridRow, Card } from 'semantic-ui-react';

import { postPropType } from '../../views/PostsCarousel/reducer';
import PostCard from '../PostCard/index';
import './style.css';

export default class CategoriesList extends Component {
  getPosts() {
    if (this.props.postsList.length % 2 === 0) {
      return (
        <Grid columns={1} divided>
          <GridColumn className="double-post">
            <GridRow>
              <PostCard post={this.props.postsList[0]} key={Math.random()} />
            </GridRow>
            <hr />
            <GridRow>
              <PostCard post={this.props.postsList[1]} key={Math.random()} />
            </GridRow>
          </GridColumn>
        </Grid>
      );
    }
    return (
      <Grid>
        <GridColumn>
          <GridRow>
            <Card>
              <PostCard post={this.props.postsList[0]} key={Math.random()} />
            </Card>
          </GridRow>
        </GridColumn>
      </Grid>
    );
  }
  render() {
    return <div>{this.getPosts()}</div>;
  }
}

CategoriesList.propTypes = {
  postsList: PropTypes.arrayOf(postPropType).isRequired,
};
