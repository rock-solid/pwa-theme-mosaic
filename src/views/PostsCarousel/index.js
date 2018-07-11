import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { fetchPosts } from './action';
import { fetchCategories } from '../CategoriesCarousel/action';
import { getCategory, categoryPropType } from '../CategoriesCarousel/reducer';
import { postPropType, getPostsFetching, getPostsByCategory, getLoadMorePosts } from './reducer';

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

      currentPage: 1,
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.readPosts(this.props.match.params.categoryId);
    this.props.dispatch(fetchTranslations);
  }

  componentDidUpdate(previousProps) {
    // If the category has changed, get the posts for the new category
    if (this.props.match.params.categoryId !== previousProps.match.params.categoryId) {
      this.readPosts(this.props.match.params.categoryId);
    }
  }

  /**
   * Get the category name from one of the post's categories.
   * @param {Array} categories
   */
  getCategoryName(post) {
    if (
      !post._embedded ||
      !post._embedded['wp:term'] ||
      !_.isArray(post._embedded['wp:term'][0]) ||
      !post._embedded['wp:term'][0].length === 0
    ) {
      return null;
    }

    const categories = post._embedded['wp:term'][0];
    const category = categories.find(
      item => Number(item.id) === Number(this.props.match.params.categoryId),
    );

    if (!_.isNil(category)) {
      return category.name;
    }

    return null;
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
    return Math.ceil(noPosts / this.state.itemsPerCard);
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
        per_page: this.state.itemsPerCard * 5,
      }),
    );
    dispatch(fetchCategories({ include: categoryId }));
  }

  /**
   * Load more items when the carousel is swiped.
   * @param {Number} index = The index of the card.
   */
  loadMore(index) {
    this.setState({ currentPage: index + 1 });

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
    // sort posts by date descending (so the same order from the api is used)
    const sortedPost = _.orderBy(this.props.posts, ['date'], ['desc']);

    const postsList = [];
    for (let i = 0; i < sortedPost.length; i += chunkSize) {
      postsList.push(sortedPost.slice(i, i + chunkSize));
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

    return (
      <div className="posts-carousel-container">
        {!_.isNil(this.props.category) ?
          <Helmet>
            <link rel="canonical" href={this.props.category.link} />
          </Helmet>
          : null}

        {this.props.loading === 1 ? <Loader active /> : null}

        <Slider {...settings}>
          {this.props.loading === 0 && listedPosts.length === 0 ? (
            <div key={Math.random()}>
              {this.props.loadTranslations === 0 &&
                this.props.translations.TEXTS && (
                  <NotFound content={this.props.translations.TEXTS.NO_ARTICLES} />
                )}
            </div>
          ) : (
              listedPosts.map(postsList => (
                <div key={Math.random()}>
                  <PostsList postsList={postsList} category={this.props.match} />
                </div>
              ))
            )}
        </Slider>
        <Footer
          title={this.props.posts.length > 0 ? this.getCategoryName(this.props.posts[0]) : ''}
          page={this.state.currentPage}
        />
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
  category: categoryPropType,
  loadTranslations: PropTypes.number,
  translations: PropTypes.shape({
    TEXTS: PropTypes.shape({
      NO_ARTICLES: PropTypes.string,
    }),
  }),
};

PostsCarousel.defaultProps = {
  category: undefined,
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
  category: getCategory(state.categories, props.match.params.categoryId),
  loadTranslations: getTranslationsFetching(state.translations),
  translations: getTranslations(state.translations),
  loadMore: getLoadMorePosts(state.posts),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchPosts, fetchCategories }, dispatch));
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsCarousel);
