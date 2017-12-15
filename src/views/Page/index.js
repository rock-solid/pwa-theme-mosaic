import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchPages } from '../SideMenu/action';
import { getPages, pagePropType } from '../SideMenu/reducer';

import PageDetails from './PageView';

class Page extends Component {
  componentWillMount() {
    this.readPage(this.props.match.params.pageId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.pageId !== nextProps.match.params.pageId) {
      this.readPage(nextProps.match.params.pageId);
    }
  }

  readPage(pageId) {
    const { dispatch } = this.props;
    dispatch(fetchPages({ id: pageId }));
  }

  render() {
    const page = this.props.pages.find(obj => obj.id === Number(this.props.match.params.pageId));
    if (_.isNil(page)) {
      return <p>Page does not exist</p>;
    }

    return <PageDetails page={page} />;
  }
}

Page.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      pageId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  pages: PropTypes.arrayOf(pagePropType).isRequired,
};

const mapStateToProps = state => ({
  pages: getPages(state.pages),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchPages }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
