import { combineReducers } from 'redux';
import _ from 'lodash';
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from './action';

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
