import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Sidebar, Header, List } from 'semantic-ui-react';

import { fetchPages } from './action';
import { getPages, pagePropType } from './reducer';

import './style.css';

class SideMenu extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchPages({}));
  }

  makePagesObject() {
    const { pages } = this.props;

    pages.map(page => (page.children = []));
    function placeChildren(crtLvl, nxtLvl) {
      crtLvl.map((parent) => {
        nxtLvl.map((child) => {
          if (child.parent === parent.id) {
            parent.children.push(child);
          }
          return crtLvl;
        });
        return crtLvl;
      });
    }

    function cleanList(list) {
      const parents = list.filter(item => item.parent === 0);
      return parents;
    }

    placeChildren(pages, pages);
    const parents = cleanList(pages);
    return parents;
  }
  render() {
    const parents = this.makePagesObject();
    return (
      <Sidebar visible={this.props.isVisible} direction="right">
        <Header>Pages</Header>
        {parents.map(item => <div key={Math.random()}>{item.title.rendered}</div>)}
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
