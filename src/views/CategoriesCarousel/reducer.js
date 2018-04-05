import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from './action';

export const categoryPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
});

export const INITIAL_STATE = Immutable({
  items: [],
  isFetching: 0,
});

const items = (state = INITIAL_STATE.items, action) => {
  switch (action.type) {
  case REQUEST_CATEGORIES:
    return state;
  case RECEIVE_CATEGORIES:
    return _.unionBy(state, action.categories, 'id');
  default:
    return state;
  }
};
const isFetching = (state = INITIAL_STATE.isFetching, action) => {
  switch (action.type) {
  case REQUEST_CATEGORIES:
    return state + 1;
  case RECEIVE_CATEGORIES:
    return state - 1;
  default:
    return state;
  }
};

export const getCategories = state => state.items;
export const getCategoriesFetching = state => state.isFetching;
export default combineReducers({ items, isFetching });
