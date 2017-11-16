import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchCategories } from './action';
import { getCategories } from './reducer';

import CategoriesList from '../../components/CategoriesList/index';

class CategoriesCarousel extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories);
  }
  createCategoriesList(chunkSize) {
    const categoriesList = [];
    let i;
    for (i = 0; i < this.props.categories.length; i += chunkSize) {
      categoriesList.push(this.props.categories.slice(i, i + chunkSize));
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

    const listedCategories = this.createCategoriesList(3);

    return (
      <Slider {...settings}>
        {listedCategories.map((categoriesList, k) => (
          <div key={k}>
            <CategoriesList categoriesList={categoriesList} />
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
