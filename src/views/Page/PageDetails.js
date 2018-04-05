import 'react-router-modal/css/react-router-modal.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Image, Header, Button } from 'semantic-ui-react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import { pagePropType } from '../SideMenu/reducer';
import './style.css';

const PageDetails = (props) => {
  function getImage(sourceImg) {
    let imageSource;
    if (sourceImg) {
      imageSource = sourceImg[0].source_url;
      return imageSource;
    }
    return imageSource;
  }

  const { page } = props;
  const { author } = page._embedded;
  const featuredMedia = page._embedded['wp:featuredmedia'];

  return (
    <Container className="page">
      <Header dividing>
        <Link to="/">
          <Button size="huge" icon="close" />
        </Link>
        <div dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
      </Header>
      <Header.Subheader>
        &nbsp;{props.texts.TEXTS && props.texts.TEXTS.BY_AUTHOR}&nbsp;<b>{author[0].name}</b>,&nbsp;<Moment format="MMMM DD, YYYY">
          {page.date}
        </Moment>
      </Header.Subheader>
      {featuredMedia ? <Image src={getImage(featuredMedia)} /> : ''}
      <Container textAlign="justified">
        <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </Container>
    </Container>
  );
};

PageDetails.defaultProps = {
  texts: {
    TEXTS: {
      BY_AUTHOR: 'by',
    },
  },
};
PageDetails.propTypes = {
  page: pagePropType.isRequired,
  texts: PropTypes.shape({
    TEXTS: PropTypes.shape({
      BY_AUTHOR: PropTypes.string,
    }),
  }),
};

export default PageDetails;
