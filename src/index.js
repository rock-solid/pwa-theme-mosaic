import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import ReactGA from 'react-ga';
import config from 'react-global-configuration';

import store from './configureStore';
import registerServiceWorker from './registerServiceWorker';

import CategoriesCarousel from './views/CategoriesCarousel/index';
import PostsCarousel from './views/PostsCarousel/index';
import PostView from './views/Post/index';
import PageView from './views/Page/index';
import Comments from './views/Comments/index';

import './index.css';

config.set(window.__INITIAL_CONFIG__, { freeze: false });
if (config.get('ga-id')) {
  ReactGA.initialize(config.get('ga-id'), { debug: true });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

render(
  <Provider store={store}>
    <HashRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={CategoriesCarousel} />
          <Route exact path="/categories" component={CategoriesCarousel} />
          <Route exact path="/category/:categorySlug/:categoryId" component={PostsCarousel} />
          {/* post routes direct url */}
          <Route exact path="/post/:postSlug/:postId" component={PostView} />
          <Route exact path="/post/:postSlug/:postId/comments/:comment_status" component={Comments} />
          {/* post routes from app navigation */}
          <Route exact path="/category/:categorySlug/:categoryId/post/:postSlug/:postId" component={PostView} />
          <Route exact path="/category/:categorySlug/:categoryId/post/:postSlug/:postId/comments/:comment_status" component={Comments} />
          <ModalRoute exact path="/page/:pageSlug/:pageId" parentPath="/" component={PageView} />
        </Switch>
        <ModalContainer />
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
