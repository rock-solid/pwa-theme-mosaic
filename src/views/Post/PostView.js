import React, { Component } from 'react';
import { Container, Image, Header, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { postPropType } from '../PostsCarousel/reducer';
import { categoryPropType } from '../CategoriesCarousel/reducer';
import './style.css';

export default class PostView extends Component {
  render() {
    const { post: { _embedded: { author } }, categories, post } = this.props;

    return (
      <Container className="post">
        <Image src="https://placeholdit.co//i/555x650" />
        <Container textAlign="justified">
          {categories.map(category => (
            <Label color="teal" key={category.id}>
              {category.name}
            </Label>
          ))}
          <Header dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <Header.Subheader>
            &nbsp;by&nbsp;<b>{author[0].name}</b>,&nbsp;<Moment format="MMMM DD, YYYY">{post.date}</Moment>
          </Header.Subheader>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </Container>
      </Container>
    );
  }
}

PostView.propTypes = {
  post: postPropType.isRequired,
  categories: PropTypes.arrayOf(categoryPropType).isRequired,
};
