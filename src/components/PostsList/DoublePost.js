import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';

import { postPropType } from '../../views/PostsCarousel/reducer';
import PostCard from '../PostCard/index';

const DoublePost = props => (
  <Grid columns={1} divided>
    <GridColumn className="double-post">
      <GridRow>
        <PostCard post={props.postsList[0]} key={Math.random()} />
      </GridRow>
      <GridRow>
        <PostCard post={props.postsList[1]} key={Math.random()} />
      </GridRow>
    </GridColumn>
  </Grid>
);

DoublePost.propTypes = {
  postsList: PropTypes.arrayOf(postPropType).isRequired,
};

export default DoublePost;
