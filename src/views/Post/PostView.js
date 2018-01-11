import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { Container, Image, Header, Label, Icon, Modal, Transition } from 'semantic-ui-react';
import Moment from 'react-moment';

import { postPropType } from '../PostsCarousel/reducer';
import './style.css';

export default class PostView extends Component {
  constructor(props) {
    super(props);
    this.getImage = this.getImage.bind(this);
    // this.handleVisibility = this.handleVisibility.bind(this);
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
    const history = createHistory();

    return (
      <Container className="post">
        <Icon size="big" name="chevron left" onClick={history.goBack} />
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
          <Icon name="close" inverted size="large" onClick={this.handleClose} />
          <Modal.Actions>
            <Icon name="comment" size="large" circular inverted color="grey" />
            <Icon name="facebook f" size="large" circular inverted color="blue" />
            <Icon name="twitter" size="large" circular inverted color="teal" />
            <Icon name="google plus" size="large" circular inverted color="red" />
          </Modal.Actions>
        </Modal>
      </Container>
    );
  }
}
PostView.propTypes = {
  post: postPropType.isRequired,
};
