import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './style.css';

const NotFound = props => (
  <Header as="h3" icon textAlign="center" className="not-found">
    <Icon name="folder open" circular />
    <Header.Content>{props.content}</Header.Content>
  </Header>
);

NotFound.propTypes = {
  content: PropTypes.string,
};

NotFound.defaultProps = {
  content: 'Sorry, we could not find what you were looking for.',
};

export default NotFound;
