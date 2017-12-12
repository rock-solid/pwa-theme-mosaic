import React, { Component } from 'react';
import { List, Header } from 'semantic-ui-react';

export default class PageList extends Component {
  state = { parentId: 0 };

  setParent(parentId) {
    parentId ? this.setState({ parentId }) : '';
  }

  render() {
    const parents = this.props.pages.filter(page => page.parent === this.state.parentId);
    return (
      <List divided relaxed>
        <Header>Go to</Header>
        {parents.map(page => (
          <List.Item key={Math.random()}>
            <List.Icon name="linkify" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header as="a">{page.title.rendered}</List.Header>
            </List.Content>
            {page.children.length > 0 ? (
              <List.Icon link name="triangle right" size="large" verticalAlign="middle" onClick={e => this.setParent(page.id)} />
            ) : (
              ''
            )}
          </List.Item>
        ))}
      </List>
    );
  }
}
