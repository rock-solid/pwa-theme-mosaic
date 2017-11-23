import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';

import { postPropType } from '../../views/PostsCarousel/reducer';
import './style.css';

export default class PostCard extends Component {
  render() {
    const { post } = this.props;

    return (
      <div>
        <Item className="posts">
          <Item.Header>{post.title.rendered}</Item.Header>
          <Item.Image size="large" src="http://via.placeholder.com/350x150" />
          <Item.Description>
            <p>{post.excerpt.rendered}</p>
          </Item.Description>
        </Item>
      </div>
    );
  }
}

PostCard.propTypes = {
  post: postPropType.isRequired,
};
