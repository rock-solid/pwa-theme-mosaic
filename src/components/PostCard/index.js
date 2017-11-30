import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { postPropType } from '../../views/PostsCarousel/reducer';
import './style.css';

export default class PostCard extends Component {
  render() {
    const { post } = this.props;
    const featuredmedia = post._embedded['wp:featuredmedia'];
    function getImage(sourceImg) {
      let image;
      if (sourceImg) {
        image = sourceImg[0].source_url;
        return image;
      }
      image = 'http://via.placeholder.com/177x119';
      return image;
    }

    return (
      <Link to={'/post/' + post.slug + '/' + post.id}>
        <Item className="posts">
          <Item.Header>
            <div dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </Item.Header>
          <Item.Content>
            <div
              className="image"
              style={{
                backgroundImage: 'url(' + getImage(featuredmedia) + ')',
              }}
            />
            {/* <Item.Image size="small" src={getImage(featuredmedia)} /> */}
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
