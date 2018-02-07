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
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
    };
  }
  componentWillMount() {
    this.readPosts(this.props.match.params.categoryId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.categoryId !== nextProps.match.params.categoryId) {
      this.readPost(nextProps.match.params.categoryId);
    }
  }

  readPosts(categoryId) {
    const { dispatch } = this.props;
    dispatch(
      fetchPosts({
        _embed: 1,
        categories: categoryId,
        page: this.state.pageNumber,
        status: 'publish',
      }),
    );
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  }

  createPostsList(chunkSize) {
    const postsList = [];
    let i;

    for (i = chunkSize; i < this.props.posts.length; i += chunkSize) {
      postsList.push(this.props.posts.slice(i, i + chunkSize));
    }
    return postsList;
  }

  render() {
    const listedPosts = this.createPostsList(2);
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: index =>
        index === listedPosts.length - 1 && this.props.posts.length % 10 === 0 ? this.readPosts(this.props.match.params.categoryId) : null,
    };

    return (
      <div className="posts-carousel-container">
        {this.props.loading === 1 && listedPosts.length < 1 ? <Loader active /> : null}
        <Slider {...settings}>
          {listedPosts.map(postsList => (
            <div key={Math.random()}>
              <PostsList postsList={postsList} category={this.props.match} />
              <Footer />
            </div>
          ))}
        </Slider>
      </div>
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
