import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Header, Icon, Modal, Image, Transition } from 'semantic-ui-react';

import './style.css';

export default class PageList extends Component {
  constructor(props) {
    super(props);
    this.state = { parentIds: [], pages: [], parentPageTitle: ['Go to'], goBack: false, visible: true };
  }

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
      visible: !this.state.visible,
    });
  }
  setParentsBackList() {
    // copie + setstate
    this.state.parentIds.pop();
    const poppedParentIds = this.state.parentIds;
    this.state.parentPageTitle.pop();
    const poppedPageTitles = this.state.parentPageTitle;
    this.setState({
      parentId: poppedParentIds,
      parentsPageTitle: poppedPageTitles,
      goBack: true,
      visible: !this.state.visible,
    });
  }

  render() {
    const checkParent = this.state.parentIds[this.state.parentIds.length - 1];
    let parents;
    // iF?
    this.state.goBack === false ? (parents = this.props.pages.filter(page => page.parent === checkParent)) : (parents = this.state.pages.pop());

    function getImage(sourceImg) {
      let imageSource;
      if (sourceImg) {
        imageSource = sourceImg[0].source_url;
        return imageSource;
      }
      return imageSource;
    }

    return (
      <Transition animation="pulse" duration={700} visible={this.state.visible}>
        <List divided relaxed>
          {checkParent === 0 || parents.length === 0 ? (
            <Header>{this.state.parentPageTitle[this.state.parentPageTitle.length - 1]}</Header>
          ) : (
            <Header>
              <Icon name="caret left" onClick={() => this.setParentsBackList()} />
              {this.state.parentPageTitle[this.state.parentPageTitle.length - 1]}
            </Header>
          )}
          {parents.map(page => (
            <List.Item key={Math.random()}>
              <List.Icon name="linkify" size="large" verticalAlign="middle" />
              <List.Content>
                <Modal closeIcon trigger={<List.Header as="a">{page.title.rendered}</List.Header>}>
                  <Modal.Header dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
                  {/* eslint */}
                  <Image src={getImage(page._embedded['wp:featuredmedia'])} size="medium" />
                  <Modal.Content dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
                  <div className="go-to">
                    <Link to={'/page/' + page.slug + '/' + page.id}>More</Link>
                  </div>
                </Modal>
              </List.Content>
              {page.children.length > 0 ? (
                <List.Icon
                  link
                  name="triangle right"
                  size="large"
                  verticalAlign="middle"
                  onClick={() => this.setParentsList(page.id, parents, page.title.rendered)}
                />
              ) : (
                ''
              )}
            </List.Item>
          ))}
        </List>
      </Transition>
    );
  }
}
