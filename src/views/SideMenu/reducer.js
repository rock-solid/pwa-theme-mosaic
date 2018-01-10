import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { REQUEST_PAGES, RECEIVE_PAGES } from './action';

export const pagePropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  parent: PropTypes.number.isRequired,
  title: PropTypes.shape({
    rendered: PropTypes.string.isRequired,
  }).isRequired,
  slug: PropTypes.string.isRequired,
  content: PropTypes.shape({
    rendered: PropTypes.string.isRequired,
  }),
  link: PropTypes.string.isRequired,
  author: PropTypes.number.isRequired,
  comment_status: PropTypes.string.isRequired,
  featured_media: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
});

export const INITIAL_STATE = Immutable({
  items: [],
  isFetching: 0,
});

const items = (state = INITIAL_STATE.items, action) => {
  switch (action.type) {
  case REQUEST_PAGES:
    return state;
  case RECEIVE_PAGES:
    if (Array.isArray(action.pages)) {
      return _.unionBy(state, action.pages, 'id');
    }
    return _.unionBy(state, [action.pages], 'id');
  default:
    return state;
  }
};
const isFetching = (state = INITIAL_STATE.isFetching, action) => {
  switch (action.type) {
  case REQUEST_PAGES:
    return state + 1;
  case RECEIVE_PAGES:
    return state - 1;
  default:
    return state;
  }
};

export const getPages = state => state.items;
export const getPagesFetching = state => state.isFetching;

export default combineReducers({ items, isFetching });
