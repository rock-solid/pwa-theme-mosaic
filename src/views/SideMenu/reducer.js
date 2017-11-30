import { combineReducers } from 'redux';
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
});

const items = (state = [], action) => {
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

export const getPages = state => state.items;
export default combineReducers({ items });
