import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './style.css';

const NotFound = props => (
  <Container className="not-found">
    <Header> {props.content}</Header>
  </Container>
);

NotFound.defaultProps = {
  content: 'Sorry, we could not find what you were looking for.',
};
NotFound.propTypes = {
  content: PropTypes.string,
};
export default NotFound;
