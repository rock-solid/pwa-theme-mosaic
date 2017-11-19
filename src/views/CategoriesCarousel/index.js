import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchCategories } from './action';
import { getCategories } from './reducer';

import CategoriesList from '../../components/CategoriesList/index';
import './style.css';

class CategoriesCarousel extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories);
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

  render() {
    const settings = {
      arrows: false,
      centerPadding: '50px',
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const categoriesList = this.createCategoriesList(3, 5);
    return (
      <Slider {...settings}>
        {categoriesList.map((categoriesChunk, k) => (
          <div key={Math.random(k)}>
            <CategoriesList prop={categoriesChunk} />
          </div>
        ))}
      </Slider>
    );
  }
}

CategoriesCarousel.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  categories: getCategories(state.categories),
});
function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchCategories }, dispatch));
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesCarousel);
