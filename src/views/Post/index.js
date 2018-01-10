import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Loader } from 'semantic-ui-react';

import { fetchPosts } from '../PostsCarousel/action';
import { getPosts, getPostsFetching, postPropType } from '../PostsCarousel/reducer';

import NotFound from '../../components/NotFound/index';
import PostDetails from './PostView';

class Post extends Component {
  componentWillMount() {
    this.readPost(this.props.match.params.postId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.postId !== nextProps.match.params.postId) {
      this.readPost(nextProps.match.params.postId);
    }
  }

  readPost(postId) {
    const { dispatch } = this.props;
    dispatch(fetchPosts({ id: postId }));
  }

  render() {
    const post = this.props.posts.find(obj => obj.id === Number(this.props.match.params.postId));

    if (this.props.loading === 1) {
      return <Loader active />;
    }

    if (_.isNil(post)) {
      return <NotFound />;
    }

    return <PostDetails post={post} />;
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
  loading: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  loading: getPostsFetching(state.posts),
  posts: getPosts(state.posts),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchPosts }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
