import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ModalContainer, ModalRoute } from 'react-router-modal';

import store from './configureStore';
import registerServiceWorker from './registerServiceWorker';

import CategoriesCarousel from './views/CategoriesCarousel/index';
import PostsCarousel from './views/PostsCarousel/index';
import PostView from './views/Post/index';
import PageView from './views/Page/index';

import './index.css';

render(
  <Provider store={store}>
    <HashRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={CategoriesCarousel} />
          <Route path="/categories" component={CategoriesCarousel} />
          <Route path="/category/:categorySlug/:categoryId" component={PostsCarousel} />
          <Route path="/post/:postSlug/:postId" component={PostView} />
          <ModalRoute path="/page/:pageSlug/:pageId" parentPath="/" component={PageView} />
        </Switch>
        <ModalContainer />
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
