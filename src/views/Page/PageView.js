import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Image, Header, Button } from 'semantic-ui-react';
import Moment from 'react-moment';

import { pagePropType } from '../SideMenu/reducer';
import { closeMenu } from '../../components/NavBar/action';
import './style.css';

class PageView extends Component {
  constructor(props) {
    super(props);
    this.hideSidebar = this.hideSidebar.bind(this);
  }

  getImage(sourceImg) {
    let imageSource;
    if (sourceImg) {
      imageSource = sourceImg[0].source_url;
      return imageSource;
    }
    return imageSource;
  }

  hideSidebar() {
    if (this.props.sideMenuVisible) {
      this.props.closeMenu();
    }
  }

  render() {
    const { page } = this.props;
    const { author } = page._embedded;
    const featuredMedia = page._embedded['wp:featuredmedia'];

    return (
      <Container className="page">
        {featuredMedia ? <Image src={this.getImage(featuredMedia)} /> : ''}
        <Container textAlign="justified">
          <Header>
            <Link to="/" onClick={this.hideSidebar}>
              <Button icon="close" />
            </Link>
            <div dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
          </Header>

          <Header.Subheader>
            &nbsp;by&nbsp;<b>{author[0].name}</b>,&nbsp;<Moment format="MMMM DD, YYYY">{page.date}</Moment>
          </Header.Subheader>

          <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </Container>
      </Container>
    );
  }
}

PageView.propTypes = {
  page: pagePropType.isRequired,
  sideMenuVisible: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sideMenuVisible: state.sideMenuVisible,
});
function mapDispatchToProps(dispatch) {
  return Object.assign(bindActionCreators({ closeMenu }, dispatch));
}
export default connect(mapStateToProps, mapDispatchToProps)(PageView);
