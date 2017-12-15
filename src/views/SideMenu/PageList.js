import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Header, Icon, Modal, Image, Transition } from 'semantic-ui-react';

import './style.css';

export default class PageList extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.openSubmenu = this.openSubmenu.bind(this);
    this.getImage = this.getImage.bind(this);
    this.state = {
      parentId: 0,
      parentPageTitle: ['Go to'],
      visible: true,
    };
  }

  getImage(sourceImg) {
    if (sourceImg) {
      return sourceImg[0].source_url;
    }
    return null;
  }

  filterPages() {
    return this.props.pages.filter(page => page.parent === this.state.parentId);
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
      <Transition animation="pulse" duration={700} visible={this.state.visible}>
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
                <Modal closeIcon trigger={<List.Header as="a">{page.title.rendered}</List.Header>}>
                  <Modal.Header dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
                  {/* eslint */}
                  <Image src={this.getImage(page._embedded['wp:featuredmedia'])} size="medium" />
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
                  onClick={() => this.openSubmenu(page.id, page.title.rendered)}
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
