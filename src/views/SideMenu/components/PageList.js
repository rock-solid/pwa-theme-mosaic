import React, { Component } from 'react';
import { List, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from 'react-global-configuration';
import _ from 'lodash';

import { pagePropType } from '../reducer';

import '../style.css';

export default class PageList extends Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
    this.openSubmenu = this.openSubmenu.bind(this);

    this.state = {
      parentId: 0,
      parentPageTitle: [],
      visible: true,
      pages: [],
    };
  }

  /**
   * Add a children property to each page - does/not have kids.
   * @param {Object} previousProps
   */
  componentDidUpdate(previousProps) {
    const pages = this.props.pages.map((item) => {
      const children = previousProps.pages.filter(child => child.parent === item.id);
      return Object.assign(item, { children: children.length > 0 });
    });

    if (!_.isEqual(this.state.pages, pages)) {
      this.setState({ pages });
    }
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
          <Header as="h2">{this.props.text && this.props.text.GO_TO}</Header>
        ) : (
          <Header as="h2">
            <Icon name="caret left" onClick={this.goBack} />
            {this.state.parentPageTitle[this.state.parentPageTitle.length - 1]}
          </Header>
        )}
        {pages.map(page => (
          <List.Item key={Math.random()}>
            <List.Icon name="linkify" size="large" verticalAlign="middle" />
            <List.Content>
              <Link to={'/page/' + page.slug + '/' + page.id}>
                <List.Header as="h3">{page.title.rendered}</List.Header>
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
            ) : null}
          </List.Item>
        ))}
        {this.state.parentId === 0 && config.get('websiteUrl') ? (
          <List.Item>
            <List.Icon name="linkify" size="large" verticalAlign="middle" />
            <List.Content>
              <a href={config.get('websiteUrl')}>
                <List.Header as="h3">
                  {this.props.text && this.props.text.VISIT_WEBSITE}
                </List.Header>
              </a>
            </List.Content>
          </List.Item>
        ) : null}
      </List>
    );
  }
}

PageList.defaultProps = {
  text: {
    GO_TO: 'Go to',
    VISIT_WEBSITE: 'Visit website',
  },
};
PageList.propTypes = {
  pages: PropTypes.arrayOf(pagePropType).isRequired,
  text: PropTypes.shape({
    GO_TO: PropTypes.string,
    VISIT_WEBSITE: PropTypes.string,
  }),
};
