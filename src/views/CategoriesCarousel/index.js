import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Sidebar, Loader, Image } from 'semantic-ui-react';
import config from 'react-global-configuration';

import { fetchCategories } from './action';
import { getCategories, getCategoriesFetching, categoryPropType } from './reducer';

import SideMenu from '../SideMenu/index';
import NavBar from '../../components/NavBar/index';
import { closeMenu } from '../../components/NavBar/action';

import CategoriesList from './components/CategoriesList/index';
import './style.css';

class CategoriesCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsPerHome: 3,
      itemsPerCard: 5,
      pageNumber: 1,

      // if load more is enabled for loading more items
      loadMore: false,
    };

    this.hideSidebar = this.hideSidebar.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  /**
   * Make request to load the initial data set.
   */
  componentWillMount() {
    const { dispatch } = this.props;

    // calculate the no of items for one home card and two regular cards
    const noItems = this.state.itemsPerHome + (this.state.itemsPerCard * 2);
    dispatch(fetchCategories({ page: this.state.pageNumber, per_page: noItems }));
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  }

  componentWillReceiveProps(nextProps) {
    // If we receive more items, load more should be enable for the next request
    if (nextProps.categories.length > this.props.categories.length) {
      this.setState({ loadMore: true });
    }
  }

  /**
   * Calculate the no of pages considering that the 1st card is the home card.
   */
  getNoPages() {
    if (this.props.categories.length === 0) {
      return 0;
    }

    const lengthWithoutHome = this.props.categories.length - this.state.itemsPerHome;
    if (lengthWithoutHome <= 0) {
      return 1;
    }

    // Add +1 if the items are not exactly split over cards (last card is incomplete).
    // Add +1 for the home card.
    return Math.round(lengthWithoutHome / this.state.itemsPerCard) +
      (lengthWithoutHome % this.state.itemsPerCard === 0 ? 0 : 1) + 1;
  }

  /**
   * Split the categories list into chunks.
   * @param {Number} homeChunkSize
   * @param {Number} regularChunkSize
   */
  createCategoriesList(homeChunkSize, regularChunkSize) {
    // get the subset of categories for home card
    const categoriesList = [];
    categoriesList.push(this.props.categories.slice(0, homeChunkSize));

    let i;
    for (i = homeChunkSize; i < this.props.categories.length; i += regularChunkSize) {
      categoriesList.push(this.props.categories.slice(i, i + regularChunkSize));
    }
    return categoriesList;
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
      const { dispatch } = this.props;
      dispatch(fetchCategories({ page: this.state.pageNumber, per_page: this.state.itemsPerCard * 3 }));
      this.setState({ pageNumber: this.state.pageNumber + 1, loadMore: false });
    }
  }

  hideSidebar() {
    if (this.props.sideMenuVisible) {
      this.props.closeMenu();
    }
  }

  render() {
    const categoriesList = this.createCategoriesList(3, 5);

    const settings = {
      arrows: false,
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: this.loadMore,
    };

    return (
      <div className="carousel-container">
        <Sidebar.Pushable>
          <SideMenu />
          <Sidebar.Pusher dimmed={this.props.sideMenuVisible} onClick={this.hideSidebar}>
            {config.get('logo') && <Image src={config.get('logo')} size="tiny" />}
            <NavBar />
            {this.props.loading === 1 ? <Loader active /> : null}
            <Slider {...settings}>
              {categoriesList.map((categoriesChunk, k) => (
                <div key={Math.random(k)} className="categories-card">
                  <CategoriesList categoriesChunk={categoriesChunk} />
                </div>
              ))}
            </Slider>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

CategoriesCarousel.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(categoryPropType).isRequired,
  sideMenuVisible: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: getCategoriesFetching(state.categories),
  categories: getCategories(state.categories),
  sideMenuVisible: state.sideMenuVisible,
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchCategories, closeMenu }, dispatch));
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesCarousel);
