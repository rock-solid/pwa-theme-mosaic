import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridColumn, GridRow, Card } from 'semantic-ui-react';

import { postPropType } from '../../reducer';
import PostCard from '../PostCard';
import './style.css';

const PostsList = (props) => {
  if (props.postsList.length % 2 === 0) {
    return (
      <div>
        <Grid columns={1} divided>
          <GridColumn className="double-post">
            <GridRow>
              <PostCard post={props.postsList[0]} key={props.postsList[0].id} category={props.category} />
            </GridRow>
            <hr />
            <GridRow>
              <PostCard post={props.postsList[1]} key={props.postsList[1].id} category={props.category} />
            </GridRow>
          </GridColumn>
        </Grid>
      </div>
    );
  }

  return (
    <div>
      <Grid className="single-post">
        <GridColumn>
          <GridRow>
            <Card>
              <PostCard post={props.postsList[0]} key={props.postsList[0].id} category={props.category} />
            </Card>
          </GridRow>
        </GridColumn>
      </Grid>
    </div>
  );
};

PostsList.propTypes = {
  postsList: PropTypes.arrayOf(postPropType).isRequired, // TO DO: check rule for eslint
  category: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
      categorySlug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PostsList;
