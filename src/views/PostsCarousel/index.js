import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

import { fetchPosts } from './action';
import { getPosts, postPropType, getPostsFetching } from './reducer';

import PostsList from '../../components/PostsList/index';
import Footer from '../../components/Footer/index';
import './style.css';

class PostsCarousel extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts({ categoryId: this.props.match.params.categoryId }));
  }
  createPostsList(chunkSize) {
    const postsList = [];
    let i;
    for (i = 0; i < this.props.posts.length; i += chunkSize) {
      postsList.push(this.props.posts.slice(i, i + chunkSize));
    }
    return postsList;
  }

  render() {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const listedPosts = this.createPostsList(2);

    if (this.props.loading === 1) {
      return <Loader active />;
    }

    return (
      <Slider {...settings}>
        {listedPosts.map(postsList => (
          <div key={Math.random()}>
            <PostsList postsList={postsList} />
            <Footer />
          </div>
        ))}
      </Slider>
    );
  }
}

PostsCarousel.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(postPropType).isRequired,
  loading: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
      categorySlug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
const mapStateToProps = state => ({
  posts: getPosts(state.posts),
  loading: getPostsFetching(state.posts),
});
function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchPosts }, dispatch));
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsCarousel);
