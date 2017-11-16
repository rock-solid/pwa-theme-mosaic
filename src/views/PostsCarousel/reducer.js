import { combineReducers } from 'redux';
import _ from 'lodash';
import { REQUEST_POSTS, RECEIVE_POSTS } from './action';

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
