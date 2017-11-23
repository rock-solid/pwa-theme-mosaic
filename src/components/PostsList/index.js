import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SinglePost from './SinglePost';
import DoublePost from './DoublePost';

export default class CategoriesList extends Component {
  getPosts() {
    if (this.props.postsList.length % 2 === 0) {
      return <DoublePost postsList={this.props.postsList} />;
    }
    return <SinglePost postsList={this.props.postsList} />;
  }
  render() {
    return <div>{this.getPosts()}</div>;
  }
}

CategoriesList.propTypes = {
  postsList: PropTypes.array.isRequired,
};
