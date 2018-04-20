import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

import { openMenu } from './action';
import './style.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.showSidebar = this.showSidebar.bind(this);
  }

  showSidebar(e) {
    e.stopPropagation();
    this.props.openMenu();
  }

  render() {
    return (
      <Button floated="right" size="tiny" className="navbar">
        <Icon name="content" onClick={this.showSidebar} size="large" />
      </Button>
    );
  }
}

NavBar.propTypes = {
  openMenu: PropTypes.func.isRequired,
};

export default connect(null, { openMenu })(NavBar);
