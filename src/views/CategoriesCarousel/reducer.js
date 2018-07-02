import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from './action';

export const categoryPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
});

export const INITIAL_STATE = Immutable({
  items: [],
  isFetching: 0,
  loadMore: true,
});

const items = (state = INITIAL_STATE.items, action) => {
  switch (action.type) {
  case REQUEST_CATEGORIES:
    return state;
  case RECEIVE_CATEGORIES:
    if (Array.isArray(action.categories)) {
      return _.unionBy(state, action.categories, 'id');
    }
    return _.unionBy(state, [action.categories], 'id');
  default:
    return state;
  }
};

const loadMore = (state = INITIAL_STATE.loadMore, action) => {
  switch (action.type) {
  case REQUEST_CATEGORIES:
    return true;
  case RECEIVE_CATEGORIES:
    if (Array.isArray(action.categories) && action.perPage !== null) {
      return !(action.categories.length < action.perPage);
    }
    return state;
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
export const getLoadMoreCategories = state => state.loadMore;
export default combineReducers({ items, isFetching, loadMore });
