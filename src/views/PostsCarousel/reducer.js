import { combineReducers } from 'redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { REQUEST_POSTS, RECEIVE_POSTS } from './action';

export const postPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.shape({
    rendered: PropTypes.string.isRequired,
  }).isRequired,
  author: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  slug: PropTypes.string.isRequired,
  content: PropTypes.shape({
    rendered: PropTypes.string.isRequired,
    protected: PropTypes.bool.isRequired,
  }).isRequired,
  excerpt: PropTypes.shape({
    rendered: PropTypes.string.isRequired,
    protected: PropTypes.bool.isRequired,
  }).isRequired,
  date: PropTypes.string.isRequired, //TO DO : date validation => class Date
  // TO DO : proptype for image src
});

const items = (state = [], action) => {
  switch (action.type) {
  case REQUEST_POSTS:
    return state;
  case RECEIVE_POSTS:
    return _.unionBy(state, action.posts, 'id');
  default:
    return state;
  }
};

export const getPosts = state => state.items;
export default combineReducers({ items });
