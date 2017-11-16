import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchPosts } from './action';
import { getPosts } from './reducer';

import PostsList from '../../components/PostsList/index';

class PostsCarousel extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts);
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
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const listedPosts = this.createPostsList(2);

    return (
      <Slider {...settings}>
        {listedPosts.map((postsList, k) => (
          <div key={k}>
            <PostsList postsList={postsList} />
          </div>
        ))}
      </Slider>
    );
  }
}

PostsCarousel.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  posts: getPosts(state.posts),
});
function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchPosts }, dispatch));
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsCarousel);
