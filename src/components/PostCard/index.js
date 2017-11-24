import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { postPropType } from '../../views/PostsCarousel/reducer';
import './style.css';

export default class PostCard extends Component {
  render() {
    const { post } = this.props;
    return (
      <Link to={'/post/' + post.slug + '/' + post.id}>
        <Item className="posts">
          <Item.Header>{post.title.rendered}</Item.Header>
          <Item.Content>
            <Item.Image size="large" src="http://via.placeholder.com/177x119" />
            <Item.Description dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </Item.Content>
        </Item>
      </Link>
    );
  }
}

PostCard.propTypes = {
  post: postPropType.isRequired,
};
