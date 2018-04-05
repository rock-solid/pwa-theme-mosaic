import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import './style.css';

const Footer = () => (
  <div className="footer">
    <Link to="/">
      <Icon name="grid layout" size="big" />
    </Link>
  </div>
);

export default Footer;
