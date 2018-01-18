import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { REQUEST_COMMENTS, RECEIVE_COMMENTS } from './actions';

export const commentPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  post: PropTypes.number.isRequired,
  author_name: PropTypes.string.isRequired,
  content: PropTypes.shape({
    rendered: PropTypes.string.isRequired,
  }).isRequired,
});

export const INITIAL_STATE = Immutable({
  items: [],
  isFetching: 0,
});

const items = (state = INITIAL_STATE.items, action) => {
  switch (action.type) {
  case REQUEST_COMMENTS:
    return state;
  case RECEIVE_COMMENTS:
    if (Array.isArray(action.comments)) {
      return _.unionBy(state, action.comments, 'id');
    }
    return _.unionBy(state, [action.comments], 'id');
  default:
    return state;
  }
};
const isFetching = (state = INITIAL_STATE.isFetching, action) => {
  switch (action.type) {
  case REQUEST_COMMENTS:
    return state + 1;
  case RECEIVE_COMMENTS:
    return state - 1;
  default:
    return state;
  }
};

export const getComments = state => state.items;
export const getCommentsFetching = state => state.isFetching;

export default combineReducers({ items, isFetching });
