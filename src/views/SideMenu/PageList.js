import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Header, Icon, Modal } from 'semantic-ui-react';

import './style.css';

export default class PageList extends Component {
  state = { parentIds: [], pages: [], parentPageTitle: ['Go to'], goBack: false };

  componentWillReceiveProps() {
    this.setState({ parentIds: [...this.state.parentIds, 0] });
    // resets state when menu reopens
    this.props.visible === true && this.setState({ parentIds: [], pages: [], parentPageTitle: ['Go to'], goBack: false });
  }
  setParentsList(parentId, pages, parentPageTitle) {
    this.setState({
      parentIds: [...this.state.parentIds, parentId],
      pages: [...this.state.pages, pages],
      parentPageTitle: [...this.state.parentPageTitle, parentPageTitle],
      goBack: false,
    });
  }
  setParentsBackList() {
    this.state.parentIds.pop();
    const poppedParentIds = this.state.parentIds;
    this.state.parentPageTitle.pop();
    const poppedPageTitles = this.state.parentPageTitle;
    this.setState({ parentId: poppedParentIds, parentsPageTitle: poppedPageTitles, goBack: true });
  }

  render() {
    const checkParent = this.state.parentIds[this.state.parentIds.length - 1];
    let parents;
    this.state.goBack === false ? (parents = this.props.pages.filter(page => page.parent === checkParent)) : (parents = this.state.pages.pop());

    return (
      <List divided relaxed>
        {checkParent === 0 ? (
          <Header>{this.state.parentPageTitle[this.state.parentPageTitle.length - 1]}</Header>
        ) : (
          <Header>
            <Icon name="caret left" onClick={e => this.setParentsBackList()} />
            {this.state.parentPageTitle[this.state.parentPageTitle.length - 1]}
          </Header>
        )}
        {parents.map(page => (
          <List.Item key={Math.random()}>
            <List.Icon name="linkify" size="large" verticalAlign="middle" />
            <List.Content>
              <Modal closeIcon trigger={<List.Header as="a">{page.title.rendered}</List.Header>}>
                <Modal.Header dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
                <Modal.Content dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
                <Modal.Actions>
                  <Link to={'/page/' + page.slug + '/' + page.id}>More</Link>
                  {console.log(this.props)}
                </Modal.Actions>
              </Modal>
            </List.Content>
            {page.children.length > 0 ? (
              <List.Icon
                link
                name="triangle right"
                size="large"
                verticalAlign="middle"
                onClick={e => this.setParentsList(page.id, parents, page.title.rendered)}
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
