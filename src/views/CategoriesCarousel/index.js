import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Sidebar, Loader, Image } from 'semantic-ui-react';
import config from 'react-global-configuration';

import { fetchCategories } from './action';
import { getCategories, getCategoriesFetching, categoryPropType } from './reducer';

import SideMenu from '../SideMenu/index';
import NavBar from '../../components/NavBar/index';
import { closeMenu } from '../../components/NavBar/action';

import CategoriesList from '../../components/CategoriesList/index';
import './style.css';

class CategoriesCarousel extends Component {
  constructor(props) {
    super(props);
    this.hideSidebar = this.hideSidebar.bind(this);
    this.state = {
      pageNumber: 1,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories({ page: this.state.pageNumber }));
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  }

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

  loadMore() {
    const { dispatch } = this.props;
    dispatch(fetchCategories({ page: this.state.pageNumber, per_page: 15 }));
    this.setState({ pageNumber: this.state.pageNumber + 1 });
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
      centerPadding: '50px',
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: index => (index === categoriesList.length - 1 && this.props.categories.length % 5 === 0 ? this.loadMore() : null),
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
                <div key={Math.random(k)} className="categories">
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesCarousel));
