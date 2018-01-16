import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Image, Header, Label, Icon, Modal, Transition } from 'semantic-ui-react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { postPropType } from '../PostsCarousel/reducer';
import './style.css';

export default class PostView extends Component {
  constructor(props) {
    super(props);
    this.getImage = this.getImage.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      modalOpen: false,
      visible: true,
    };
  }

  getImage(sourceImg) {
    let imageSource;
    if (sourceImg) {
      imageSource = sourceImg[0].source_url;
      return imageSource;
    }
    imageSource = 'https://placeholdit.co//i/555x650';
    return imageSource;
  }

  handleOpen() {
    this.setState({ modalOpen: true, visible: !this.state.visible });
  }

  handleClose() {
    this.setState({ modalOpen: false, visible: !this.state.visible });
  }

  render() {
    const { post } = this.props;
    const { author } = post._embedded;
    const categoriesList = post._embedded['wp:term'];
    const featuredMedia = post._embedded['wp:featuredmedia'];
    // set path routes
    let goBack = {};
    let path = {};
    if (_.isNil(this.props.category.categorySlug)) {
      goBack = '/';
      path = '/post/' + post.slug + '/' + post.id + '/comments';
    } else {
      goBack = '/category/' + this.props.category.categorySlug + '/' + this.props.category.categoryId;
      path =
        '/category/' + this.props.category.categorySlug + '/' + this.props.category.categoryId + '/post/' + post.slug + '/' + post.id + '/comments';
    }

    return (
      <Container className="post">
        <Link to={goBack}>
          <Icon size="big" name="chevron left" />
        </Link>
        <Image src={this.getImage(featuredMedia)} />
        <Container textAlign="justified">
          {categoriesList[0].map(category => (
            <Label color="teal" key={category.name}>
              {category.name}
            </Label>
          ))}
          <Header>
            <div dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </Header>
          <Header.Subheader>
            &nbsp;by&nbsp;<b>{author[0].name}</b>,&nbsp;<Moment format="MMMM DD, YYYY">{post.date}</Moment>
          </Header.Subheader>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </Container>
        <Modal
          open={this.state.modalOpen}
          onClick={this.handleClose}
          trigger={
            <Transition.Group animation="fade up" duration="500" className="transition-container">
              {this.state.visible && <Icon circular name="share alternate" size="large" onClick={this.handleOpen} />}
            </Transition.Group>
          }
          basic
        >
          <Modal.Actions>
            <Link to={path}>
              <Icon name="comment" size="large" circular inverted color="grey" />
            </Link>
            <a href={'https://m.facebook.com/sharer.php?u=' + post.link}>
              <Icon name="facebook f" size="large" circular inverted color="blue" />
            </a>
            <a href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(post.title.rendered) + ' ' + post.link}>
              <Icon name="twitter" size="large" circular inverted color="teal" />
            </a>
            <a href={'https://plus.google.com/share?url=' + post.link}>
              <Icon name="google plus" size="large" circular inverted color="red" />
            </a>
          </Modal.Actions>
        </Modal>
      </Container>
    );
  }
}
PostView.propTypes = {
  post: postPropType.isRequired,
  category: PropTypes.shape({
    categorySlug: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
  }).isRequired,
};
