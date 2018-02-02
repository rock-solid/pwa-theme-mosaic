import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';

import { REQUEST_TRANSLATIONS, RECEIVE_TRANSLATIONS } from './actions';

export const INITIAL_STATE = Immutable({
  items: [],
  isFetching: 0,
});

const items = (state = INITIAL_STATE.items, action) => {
  switch (action.type) {
  case REQUEST_TRANSLATIONS:
    return state;
  case RECEIVE_TRANSLATIONS:
    return action.translations;
  default:
    return state;
  }
};
const isFetching = (state = INITIAL_STATE.isFetching, action) => {
  switch (action.type) {
  case REQUEST_TRANSLATIONS:
    return state + 1;
  case RECEIVE_TRANSLATIONS:
    return state - 1;
  default:
    return state;
  }
};

export const getTranslations = state => state.items;
export const getTranslationsFetching = state => state.isFetching;
export default combineReducers({ items, isFetching });
