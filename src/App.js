import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import CategoriesCarousel from './views/CategoriesCarousel/index';
// import PostsCarousel from './views/PostsCarousel/index';
import Test from './components/test';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="carousel-container">
          {/* <Test /> */}
          <CategoriesCarousel id="categories-carousel" />
          {/* <PostsCarousel id="posts-carousel" /> */}
        </div>
      </div>
    );
  }
}

export default App;
