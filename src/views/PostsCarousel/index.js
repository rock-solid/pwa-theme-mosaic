import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import Helmet from 'react-helmet';

import { fetchPosts } from './action';
import { fetchCategories as fetchCategory } from '../CategoriesCarousel/action';
import { getCategories as getCategory, categoryPropType } from '../CategoriesCarousel/reducer';
import { postPropType, getPostsFetching, getPostsByCategory, getLoadMore } from './reducer';

import PostsList from './components/PostsList';
import Footer from '../../components/Footer/index';
import NotFound from '../../components/NotFound';
import './style.css';

// translations
import { fetchTranslations } from '../../translations/actions';
import { getTranslations, getTranslationsFetching } from '../../translations/reducers';

class PostsCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerCard: 2,
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentWillMount() {
    this.readPosts(this.props.match.params.categoryId);
    this.props.dispatch(fetchTranslations);
  }

  componentWillReceiveProps(nextProps) {
    // If the category has changed, get the posts for the new category
    if (this.props.match.params.categoryId !== nextProps.match.params.categoryId) {
      this.readPosts(nextProps.match.params.categoryId);
    }
  }

  /**
   * Calculate the page number for the next request.
   */
  getPageNumber() {
    return Math.round(this.props.posts.length / (this.state.itemsPerCard * 5));
  }

  /**
   * Calculate the no of cards.
   */
  getNoCards() {
    const noPosts = this.props.posts.length;

    // Add +1 if the items are not exactly split over cards (last card is incomplete).
    return (
      Math.round(noPosts / this.state.itemsPerCard) +
      (noPosts % this.state.itemsPerCard === 0 ? 0 : 1)
    );
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
        page: this.getPageNumber() + 1,
        status: 'publish',
        per_page: this.state.itemsPerCard * 5,
      }),
    );
    dispatch(fetchCategory({ id: categoryId }));
  }

  /**
   * Load more items when the carousel is swiped.
   * @param {Number} index = The index of the card.
   */
  loadMore(index) {
    if (this.props.loadMore === false) {
      return;
    }

    const noCards = this.getNoCards();

    if (index === noCards - 1) {
      this.readPosts(this.props.match.params.categoryId);
    }
  }

  /**
   * Split the posts on cards.
   * @param {Number} chunkSize
   */
  createPostsList(chunkSize) {
    const postsList = [];
    for (let i = 0; i < this.props.posts.length; i += chunkSize) {
      postsList.push(this.props.posts.slice(i, i + chunkSize));
    }
    return postsList;
  }

  // @todo add empty message if posts are not found!
  render() {
    const listedPosts = this.createPostsList(2);
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: this.loadMore,
    };

    return (
      <div className="posts-carousel-container">
        <Helmet>
          <link rel="canonical" href={this.props.category[0] && this.props.category[0].link} />
        </Helmet>
        {this.props.loading === 1 ? <Loader active /> : null}
        <Slider {...settings}>
          {this.props.loading === 0 && listedPosts.length === 0 ? (
            <div key={Math.random()}>
              {this.props.loadTranslations === 0 &&
                this.props.translations.TEXTS && (
                  <NotFound content={this.props.translations.TEXTS.NO_ARTICLES} />
                )}
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
  loadMore: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
      categorySlug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  category: PropTypes.arrayOf(categoryPropType),
  loadTranslations: PropTypes.number,
  translations: PropTypes.shape({
    TEXTS: PropTypes.shape({
      NO_ARTICLES: PropTypes.string,
    }),
  }),
};
PostsCarousel.defaultProps = {
  category: {},
  loadTranslations: 0,
  translations: {
    TEXTS: {
      NO_ARTICLES: '',
    },
  },
};
const mapStateToProps = (state, props) => ({
  posts: getPostsByCategory(state.posts, props.match.params.categoryId),
  loading: getPostsFetching(state.posts),
  category: getCategory(state.categories),
  loadTranslations: getTranslationsFetching(state.translations),
  translations: getTranslations(state.translations),
  loadMore: getLoadMore(state.posts),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchPosts, fetchCategory }, dispatch));
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsCarousel);
