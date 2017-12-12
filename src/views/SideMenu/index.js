import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Sidebar } from 'semantic-ui-react';

import { fetchPages } from './action';
import { getPages, pagePropType } from './reducer';
import PageList from './PageList';

import './style.css';

class SideMenu extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchPages({}));
  }

  makePagesList() {
    const { pages } = this.props;
    pages.map((page) => {
      page.children = [];
      return page;
    });
    function placeChildren(currentLevel, nextLevel) {
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
    placeChildren(pages, pages);
  }

  render() {
    const { pages } = this.props;
    this.makePagesList();
    return (
      <Sidebar visible={this.props.isVisible} direction="right">
        <PageList pages={pages} />
      </Sidebar>
    );
  }
}
SideMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  pages: PropTypes.arrayOf(pagePropType).isRequired,
};
const mapStateToProps = state => ({
  pages: getPages(state.pages),
});
function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchPages }, dispatch));
}
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
