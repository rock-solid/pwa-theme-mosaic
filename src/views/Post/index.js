import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchPosts } from '../PostsCarousel/action';
import { fetchCategories } from '../CategoriesCarousel/action';
import { getPosts, postPropType } from '../PostsCarousel/reducer';
import { getCategories, categoryPropType } from '../CategoriesCarousel/reducer';

import PostDetails from './PostView';

class Post extends Component {
  componentWillMount() {
    this.readPost(this.props.match.params.postId);
    this.readCategories(this.props.match.params.postId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.postId !== nextProps.match.params.postId) {
      this.readPost(nextProps.match.params.postId);
      this.readCategories(nextProps.match.params.postId);
    }
  }

  readPost(postId) {
    const { dispatch } = this.props;
    dispatch(fetchPosts({ id: postId }));
  }

  readCategories(postId) {
    const { dispatch } = this.props;
    dispatch(fetchCategories({ post: postId }));
  }

  render() {
    const post = this.props.posts.find(obj => obj.id === Number(this.props.match.params.postId));
    if (_.isNil(post)) {
      return <p>Post does not exist</p>;
    }

    return <PostDetails post={post} categories={this.props.categories} />;
  }
}

Post.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  posts: PropTypes.arrayOf(postPropType).isRequired,
  categories: PropTypes.arrayOf(categoryPropType).isRequired,
};

const mapStateToProps = state => ({
  posts: getPosts(state.posts),
  categories: getCategories(state.categories),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchPosts, fetchCategories }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
