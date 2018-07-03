import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './style.css';

const Footer = props => (
  <div className="footer">
    <div className="footer-side">
      <Link to="/">
        <Icon name="home" size="big" />
      </Link>
    </div>
    <h4>{props.title}</h4>
    <div className="footer-side">
      <span>{props.page ? `Page ${props.page}` : ''}</span>
    </div>
  </div>
);

Footer.propTypes = {
  title: PropTypes.string,
  page: PropTypes.number,
};

Footer.defaultProps = {
  title: null,
  page: null,
};

export default Footer;
