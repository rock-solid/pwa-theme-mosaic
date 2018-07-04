import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Loader } from 'semantic-ui-react';

import { fetchPosts } from '../PostsCarousel/action';
import { getPosts, getPostsFetching, postPropType } from '../PostsCarousel/reducer';

import NotFound from '../../components/NotFound/index';
import PostDetails from './PostDetails';

// translations
import { fetchTranslations } from '../../translations/actions';
import { getTranslations, getTranslationsFetching } from '../../translations/reducers';

class Post extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTranslations);
    this.readPost(this.props.match.params.postId);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.match.params.postId !== this.props.match.params.postId) {
      this.readPost(this.props.match.params.postId);
    }
  }

  readPost(postId) {
    const { dispatch } = this.props;
    dispatch(fetchPosts({ id: postId }));
  }

  render() {
    const post = this.props.posts.find(obj => obj.id === Number(this.props.match.params.postId));

    if (this.props.loading === 1 || _.isNil(this.props.translations.TEXTS)) {
      return <Loader active />;
    }

    if (_.isNil(post)) {
      return <NotFound content={this.props.translations.TEXTS.NO_ARTICLES} />;
    }

    return (
      <PostDetails post={post} category={this.props.match.params} texts={this.props.translations} />
    );
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
  translations: PropTypes.shape({
    TEXTS: PropTypes.shape({
      NO_ARTICLES: PropTypes.string,
    }),
  }),
};

Post.defaultProps = {
  translations: {
    TEXTS: {
      NO_ARTICLES: 'There are no articles!',
    },
  },
};

const mapStateToProps = state => ({
  loading: getPostsFetching(state.posts),
  posts: getPosts(state.posts),
  loadTranslations: getTranslationsFetching(state.translations),
  translations: getTranslations(state.translations),
});

function mapDispatchToProps(dispatch) {
  return Object.assign(
    { dispatch },
    bindActionCreators({ fetchPosts, fetchTranslations }, dispatch),
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
