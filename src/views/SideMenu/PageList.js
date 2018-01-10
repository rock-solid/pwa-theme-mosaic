import React, { Component } from 'react';
import { List, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { pagePropType } from './reducer';

import './style.css';

class PageList extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.openSubmenu = this.openSubmenu.bind(this);
    this.getImage = this.getImage.bind(this);
    this.state = {
      parentId: 0,
      parentPageTitle: ['Go to'],
      visible: true,
      pages: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    // add a children property to each page - does/not have kids
    const pages = nextProps.pages.map((item) => {
      const children = this.props.pages.filter(child => child.parent === item.id);
      const aux = item;
      aux.children = children.length > 0;
      return aux;
    });
    this.setState({ pages });
  }

  getImage(sourceImg) {
    if (sourceImg) {
      return sourceImg[0].source_url;
    }
    return null;
  }

  filterPages() {
    return this.state.pages.filter(page => page.parent === this.state.parentId);
  }

  openSubmenu(parentId, parentPageTitle) {
    this.setState({ parentId, parentPageTitle: [...this.state.parentPageTitle, parentPageTitle] });
  }

  goBack() {
    const parentPage = this.props.pages.filter(page => page.id === this.state.parentId);
    const titles = this.state.parentPageTitle.slice();
    titles.pop();
    this.setState({ parentId: parentPage[0].parent, parentPageTitle: titles });
  }

  render() {
    const pages = this.filterPages();

    return (
      <List divided relaxed>
        {this.state.parentId === 0 ? (
          <Header>{this.state.parentPageTitle[this.state.parentPageTitle.length - 1]}</Header>
        ) : (
          <Header>
            <Icon name="caret left" onClick={this.goBack} />
            {this.state.parentPageTitle[this.state.parentPageTitle.length - 1]}
          </Header>
        )}
        {pages.map(page => (
          <List.Item key={Math.random()}>
            <List.Icon name="linkify" size="large" verticalAlign="middle" />
            <List.Content>
              <Link to={'/page/' + page.slug + '/' + page.id}>
                <List.Header>{page.title.rendered}</List.Header>
              </Link>
            </List.Content>
            {page.children ? (
              <List.Icon
                link
                name="triangle right"
                size="large"
                verticalAlign="middle"
                onClick={() => this.openSubmenu(page.id, page.title.rendered)}
              />
            ) : (
              ''
            )}
          </List.Item>
        ))}
      </List>
    );
  }
}

PageList.propTypes = {
  pages: PropTypes.arrayOf(pagePropType).isRequired,
};

export default PageList;
