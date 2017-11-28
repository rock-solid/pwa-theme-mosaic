import { combineReducers } from 'redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from './action';

export const categoryPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
});
const items = (state = [], action) => {
  switch (action.type) {
  case REQUEST_CATEGORIES:
    return state;
  case RECEIVE_CATEGORIES:
    return _.unionBy(state, action.categories, 'id');
  default:
    return state;
  }
};

export const getCategories = state => state.items;
export default combineReducers({ items });
