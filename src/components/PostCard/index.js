import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';

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
  post: PropTypes.object.isRequired,
};
