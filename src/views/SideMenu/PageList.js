import React, { Component } from 'react';
import { List, Header } from 'semantic-ui-react';

export default class PageList extends Component {
  state = { parentId: 0, parentTitle: '' };

  setParent(parentId, parentTitle) {
    parentId ? this.setState({ parentId, parentTitle }) : '';
  }

  render() {
    const parents = this.props.pages.filter(page => page.parent === this.state.parentId);
    return (
      <List divided relaxed>
        <Header>{this.state.parentId === 0 ? 'Go to' : this.state.parentTitle}</Header>
        {parents.map(page => (
          <List.Item key={Math.random()}>
            <List.Icon name="linkify" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header as="a">{page.title.rendered}</List.Header>
            </List.Content>
            {page.children.length > 0 ? (
              <List.Icon link name="triangle right" size="large" verticalAlign="middle" onClick={e => this.setParent(page.id, page.title.rendered)} />
            ) : (
              ''
            )}
          </List.Item>
        ))}
      </List>
    );
  }
}
