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
  constructor(props) {
    super(props);
    this.placeChildren = this.placeChildren.bind(this);
    this.makePagesList = this.makePagesList.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchPages({}));
  }

  placeChildren(currentLevel, nextLevel) {
    currentLevel.map((parent) => {
      nextLevel.map((child) => {
        if (child.parent === parent.id) {
          parent.children.push(child);
        }
        return nextLevel;
      });
      return currentLevel;
    });
  }

  makePagesList() {
    const { pages } = this.props;
    pages.map((page) => {
      page.children = [];
      return page;
    });
    this.placeChildren(pages, pages);
  }

  render() {
    const { pages } = this.props;
    this.makePagesList();

    return (
      <Sidebar visible={this.props.isVisible} direction="right">
        {this.props.loading === 1 ? <Loader /> : ''}
        <PageList visible={this.props.isVisible} pages={pages} />
      </Sidebar>
    );
  }
}
SideMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  pages: PropTypes.arrayOf(pagePropType).isRequired,
};

const mapStateToProps = state => ({
  pages: getPages(state.pages),
  loading: getPagesFetching(state.pages),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchPages }, dispatch));
}
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
