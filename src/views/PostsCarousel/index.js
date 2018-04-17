import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loader, Header, Icon } from 'semantic-ui-react';

import { fetchPosts } from './action';
import { getPosts, postPropType, getPostsFetching } from './reducer';

import PostsList from './components/PostsList';
import Footer from '../../components/Footer/index';
import './style.css';

class PostsCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerCard: 2,
      pageNumber: 1,

      // if load more is enabled for loading more items
      loadMore: false,
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentWillMount() {
    this.readPosts(this.props.match.params.categoryId);
  }

  componentWillReceiveProps(nextProps) {
    // If the category has changed, get the posts for the new category
    if (this.props.match.params.categoryId !== nextProps.match.params.categoryId) {
      this.readPosts(nextProps.match.params.categoryId);
      return;
    }

    // If we receive more items, load more should be enabled for the next request
    if (nextProps.posts.length > this.props.posts.length) {
      this.setState({ loadMore: true });
    }
  }

  /**
   * Calculate the no of pages.
   */
  getNoPages() {
    const noPosts = this.props.posts.length;

    // Add +1 if the items are not exactly split over cards (last card is incomplete).
    return Math.round(noPosts / this.state.itemsPerCard) + (noPosts % this.state.itemsPerCard === 0 ? 0 : 1);
  }

  /**
   * Make request to load posts.
   * @param {Number} categoryId
   */
  readPosts(categoryId) {
    const { dispatch } = this.props;
    dispatch(
      fetchPosts({
        categories: categoryId,
        page: this.state.pageNumber,
        status: 'publish',
        per_page: this.state.itemsPerCard * 5,
      }),
    );

    this.setState({ pageNumber: this.state.pageNumber + 1, loadMore: false });
  }

  /**
   * Load more items when the carousel is swiped.
   * @param {Number} index = The index of the card.
   */
  loadMore(index) {
    if (this.state.loadMore === false) {
      return;
    }

    const noPages = this.getNoPages();

    if (index === noPages - 1) {
      this.readPosts(this.props.match.params.categoryId);
    }
  }

  /**
   * Split the posts on cards.
   * @param {Number} chunkSize
   */
  createPostsList(chunkSize) {
    const postsList = [];
    let i;

    for (i = 0; i < this.props.posts.length; i += chunkSize) {
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
      afterChange: this.loadMore,
    };
    console.log('posts props', this.props, listedPosts.length);
    return (
      <div className="posts-carousel-container">
        {this.props.loading === 1 ? <Loader active /> : null}
        <Slider {...settings}>
          {this.props.loading === 0 && listedPosts.length === 0 ? (
            <div key={Math.random()}>
              <Header as="h3" icon textAlign="center" className="not-found">
                <Icon name="folder open" circular />
                <Header.Content>This category does not have any posts.</Header.Content>
              </Header>
              <Footer />
            </div>
          ) : (
            listedPosts.map(postsList => (
              <div key={Math.random()}>
                <PostsList postsList={postsList} category={this.props.match} />
                <Footer />
              </div>
            ))
          )}
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
