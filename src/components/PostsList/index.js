import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridColumn, GridRow, Card } from 'semantic-ui-react';

import { postPropType } from '../../views/PostsCarousel/reducer';
import PostCard from '../PostCard/index';
import './style.css';

const PostsList = (props) => {
  function getPosts() {
    if (props.postsList.length % 2 === 0) {
      return (
        <Grid columns={1} divided>
          <GridColumn className="double-post">
            <GridRow>
              <PostCard post={props.postsList[0]} key={props.postsList[0].id} />
            </GridRow>
            <hr />
            <GridRow>
              <PostCard post={props.postsList[1]} key={props.postsList[1].id} />
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
              <PostCard post={props.postsList[0]} key={props.postsList[0].id} />
            </Card>
          </GridRow>
        </GridColumn>
      </Grid>
    );
  }
  return <div>{getPosts()}</div>;
};

PostsList.propTypes = {
  postsList: PropTypes.arrayOf(postPropType).isRequired, // TO DO: check rule for eslint
};

export default PostsList;
