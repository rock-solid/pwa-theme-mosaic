import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Container, Header, Icon, Modal, Transition } from 'semantic-ui-react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import _ from 'lodash';
import config from 'react-global-configuration';
import { DFPSlotsProvider, AdSlot } from 'react-dfp';
import SocialMedia from './components/SocialMedia';
import { postPropType } from '../PostsCarousel/reducer';
import CategoryLabel from '../../components/CategoryLabel';
import './style.css';

class PostDetails extends Component {
  constructor(props) {
    super(props);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      modalOpen: false,
      visible: true,
    };
  }

  getPostContent() {
    const { post } = this.props;
    if (post.content.protected === false) {
      return post.content.rendered;
    }

    return (
      "<p>This post is password protected! Enter the password <a href='" +
      post.link +
      "?pwapp_theme_mode=desktop'>here</a>."
    );
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

    // adsense params
    const googleAds = config.get('googleAds');

    // set path routes
    let goBack = '/';
    let path = '';

    if (!_.isNil(this.props.category.categorySlug) && !_.isNil(this.props.category.categoryId)) {
      path = '/category/' + this.props.category.categorySlug + '/' + this.props.category.categoryId;
      goBack = path;
    }

    path = path + '/post/' + post.slug + '/' + post.id + '/comments/' + post.comment_status;

    return (
      <Container className="post">
        <Helmet>
          <link rel="canonical" href={post.link} />
        </Helmet>
        <Link to={goBack}>
          <Icon circular size="large" name="chevron left" className={featuredMedia ? 'absolute' : ''} />
        </Link>
        {_.isArray(featuredMedia) && !_.isNil(featuredMedia[0]) ? (
          <div
            className="post-image"
            style={{ backgroundImage: `url(${featuredMedia[0].source_url})` }}
          />
        ) : null}
        <Container textAlign="justified">
          <Header>
            <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </Header>
          {categoriesList[0].map(category => (
            <CategoryLabel
              link={`/category/${category.slug}/${category.id}`}
              name={category.name}
              key={category.name}
            />
          ))}
          <Header.Subheader>
            &nbsp;{this.props.texts.TEXTS && this.props.texts.TEXTS.BY_AUTHOR}&nbsp;<b>
              {author.map(item => item.name).join(', ')}
            </b>,&nbsp;<Moment format="MMMM DD, YYYY">{post.date}</Moment>
          </Header.Subheader>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: this.getPostContent() }}
          />
          {!_.isNil(googleAds) && !_.isNil(googleAds.phone) ? (
            <DFPSlotsProvider
              dfpNetworkId={googleAds.phone.networkCode}
              sizeMapping={[{ viewport: [900, 768], sizes: googleAds.phone.sizes }]}
            >
              <div className="mobile-ads">
                <AdSlot sizes={googleAds.phone.sizes} adUnit={googleAds.phone.adUnitCode} />
              </div>
            </DFPSlotsProvider>
          ) : null}
        </Container>
        {post.content.protected === false ? (
          <Modal
            className="share"
            open={this.state.modalOpen}
            onClick={this.handleClose}
            trigger={
              <Transition.Group animation="fade up" duration="500" className="transition-container">
                {this.state.visible && (
                  <Icon circular name="share alternate" size="large" onClick={this.handleOpen} />
                )}
              </Transition.Group>
            }
            basic
          >
            <Modal.Actions>
              <Link to={path}>
                <Icon circular name="comment" size="large" />
              </Link>
              <SocialMedia title={post.title.rendered} link={post.link} />
            </Modal.Actions>
          </Modal>
        ) : null}
      </Container>
    );
  }
}

PostDetails.propTypes = {
  post: postPropType.isRequired,
  category: PropTypes.shape({
    categorySlug: PropTypes.string,
    categoryId: PropTypes.string,
  }).isRequired,
  texts: PropTypes.shape({
    TEXTS: PropTypes.shape({
      BY_AUTHOR: PropTypes.string,
    }),
  }),
};

PostDetails.defaultProps = {
  texts: {
    TEXTS: {
      BY_AUTHOR: 'by',
    },
  },
};

export default PostDetails;
