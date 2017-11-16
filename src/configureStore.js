import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import categories from './views/CategoriesCarousel/reducer';
import posts from './views/PostsCarousel/reducer';

const history = createHistory();

const defaultState = {
  categories: {
    items: [],
  },
  posts: {
    items: [],
  },
};

const rootReducer = combineReducers({
  categories,
  posts,
});

const store = createStore(rootReducer, defaultState, compose(applyMiddleware(thunk, logger, routerMiddleware(history))));

export { history };
export default store;
