import React from 'react';
import PropTypes from 'prop-types';

import { postPropType } from '../../reducer';
import PostCard from '../PostCard';
import './style.css';

const PostsList = (props) => {
  if (props.postsList.length % 2 === 0) {
    return (
      <div className="double-post">
        <PostCard post={props.postsList[0]} key={props.postsList[0].id} category={props.category} />
        <PostCard post={props.postsList[1]} key={props.postsList[1].id} category={props.category} />
      </div>
    );
  }

  return (
    <div className="single-post">
      <PostCard post={props.postsList[0]} key={props.postsList[0].id} category={props.category} />
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
