import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import PostCard from '../PostCard/index';

export default class CategoriesList extends Component {
  render() {
    const { postsList } = this.props;
    return <div>{postsList.map(post => <PostCard post={post} key={post.name} />)}</div>;
  }
}

CategoriesList.propTypes = {
  postsList: PropTypes.array.isRequired,
};
