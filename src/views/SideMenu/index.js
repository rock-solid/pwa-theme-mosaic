import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Sidebar, Loader } from 'semantic-ui-react';

import { fetchPages } from './action';
import { getPages, pagePropType, getPagesFetching } from './reducer';
import PageList from './PageList';

import './style.css';

class SideMenu extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchPages({}));
  }

  render() {
    const { pages } = this.props;

    return (
      <Sidebar visible={this.props.sideMenuVisible} direction="right">
        {this.props.loading === 1 ? <Loader active /> : ''}
        <PageList pages={pages} />
      </Sidebar>
    );
  }
}
SideMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  sideMenuVisible: PropTypes.bool.isRequired,
  pages: PropTypes.arrayOf(pagePropType).isRequired,
};

const mapStateToProps = state => ({
  pages: getPages(state.pages),
  loading: getPagesFetching(state.pages),
  sideMenuVisible: state.sideMenuVisible,
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchPages }, dispatch));
}
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
