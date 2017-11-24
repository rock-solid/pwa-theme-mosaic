import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridRow, GridColumn, Card } from 'semantic-ui-react';

import { postPropType } from '../../views/PostsCarousel/reducer';
import PostCard from '../PostCard/index';
import './style.css';

const SinglePost = props => (
  <Grid>
    <GridColumn>
      <GridRow>
        <Card>
          <PostCard post={props.postsList[0]} key={Math.random()} />
        </Card>
      </GridRow>
    </GridColumn>
  </Grid>
);

SinglePost.propTypes = {
  postsList: PropTypes.arrayOf(postPropType).isRequired,
};
export default SinglePost;
