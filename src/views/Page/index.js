import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchPages } from '../SideMenu/action';
import { getPages, getPagesFetching, pagePropType } from '../SideMenu/reducer';

import NotFound from '../../components/NotFound/index';

import PageDetails from './PageDetails';

class PageView extends Component {
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

    if (this.props.loading === 1) {
      return <Loader active />;
    }

    if (_.isNil(page)) {
      return <NotFound />;
    }

    return <PageDetails page={page} />;
  }
}

PageView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      pageId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  pages: PropTypes.arrayOf(pagePropType).isRequired,
  loading: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  loading: getPagesFetching(state.pages),
  pages: getPages(state.pages),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchPages }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(PageView);
