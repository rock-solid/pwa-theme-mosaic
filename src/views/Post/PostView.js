import React, { Component } from 'react';
import { Container, Image, Header } from 'semantic-ui-react';

import { postPropType } from '../PostsCarousel/reducer';
import './style.css';

export default class PostView extends Component {
  render() {
    console.log('PROP', this.props.post);
    const { post } = this.props;
    return (
      <Container className="post">
        <Image src="https://placeholdit.co//i/555x350" />
        <Container textAlign="justified">
          <Header>{post.title.rendered}</Header>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </Container>
      </Container>
    );
  }
}

PostView.propTypes = {
  post: postPropType.isRequired,
};
