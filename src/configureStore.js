import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import sideMenuVisible from './components/NavBar/reducer';
import categories from './views/CategoriesCarousel/reducer';
import posts from './views/PostsCarousel/reducer';
import pages from './views/SideMenu/reducer';
import comments from './views/Comments/reducers';

const history = createHistory();

const defaultState = {
  sideMenuVisible: false,
  categories: {
    items: [],
  },
  posts: {
    items: [],
  },
  pages: {
    items: [],
  },
  comments: {
    items: [],
  },
};

const rootReducer = combineReducers({
  sideMenuVisible,
  categories,
  posts,
  pages,
  comments,
});

const store = createStore(rootReducer, defaultState, compose(applyMiddleware(thunk, logger, routerMiddleware(history))));

export { history };
export default store;
