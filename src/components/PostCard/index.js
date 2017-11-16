import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Header, Container } from 'semantic-ui-react';

export default class PostCard extends Component {
  render() {
    const { post } = this.props;
    const postSettings = {
      fluid: true,
    };

    return (
      <div>
        <Card {...postSettings}>
          <Card.Header as={Header}>{post.title.rendered}</Card.Header>
          <Container>{post.excerpt.rendered}</Container>
        </Card>
      </div>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};
