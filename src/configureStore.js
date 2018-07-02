import { createStore, applyMiddleware, compose } from 'redux';
import { persistCombineReducers, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import sideMenuVisible from './components/NavBar/reducer';
import categories from './views/CategoriesCarousel/reducer';
import posts from './views/PostsCarousel/reducer';
import pages from './views/SideMenu/reducer';
import comments from './views/Comments/reducers';
import translations from './translations/reducers';

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
  form: {
    comment: {
      values: {
        name: '',
        email: '',
        content: '',
      },
    },
  },
  translations: {
    items: {},
  },
};

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['categories', 'posts', 'pages', 'comments', 'translations', 'sideMenuVisible'],
};
const persistConfig = {
  storage,
  blacklist: ['isFetching'],
};
const rootReducer = persistCombineReducers(rootPersistConfig, {
  sideMenuVisible,
  categories: persistReducer(
    {
      key: 'categories',
      ...persistConfig,
    },
    categories,
  ),
  posts: persistReducer(
    {
      key: 'posts',
      storage,
      blacklist: ['isFetching', 'loadMore'],
    },
    posts,
  ),
  pages: persistReducer(
    {
      key: 'pages',
      ...persistConfig,
    },
    pages,
  ),
  comments: persistReducer(
    {
      key: 'comments',
      ...persistConfig,
    },
    comments,
  ),
  translations: persistReducer(
    {
      key: 'translations',
      ...persistConfig,
    },
    translations,
  ),
  form: formReducer,
});

const store = createStore(
  rootReducer,
  defaultState,
  compose(applyMiddleware(thunk, logger, routerMiddleware(history))),
);
const persistor = persistStore(store);

export { history, persistor };
export default store;
