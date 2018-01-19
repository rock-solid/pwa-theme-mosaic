import React, { Component } from 'react';
import { Header, Comment, Icon, Container, Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { addComment } from './actions';
import { commentPropType } from './reducers';
import CommentForm from '../../components/Form/index';
import './style.css';

export default class CommentsView extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  submit(values) {
    const params = {
      author_name: values.name,
      email: values.email,
      content: {
        rendered: values.content,
      },
      date: new Date(),
      post: this.props.match.params.postId,
    };
    addComment(params);
  }

  showModal() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <Comment.Group>
        {this.props.comments.length > 0 ? (
          this.props.comments.map(comment => (
            <Comment key={String(comment.id) + String(comment.content.rendered.length)}>
              <Comment.Avatar src={comment.author_avatar_urls[24]} />
              <Comment.Content>
                <Comment.Author as="a">{comment.author_name}</Comment.Author>
                <Comment.Metadata>
                  <div>{comment.date}</div>
                </Comment.Metadata>
                <Comment.Text dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
                <Comment.Actions>
                  <Comment.Action
                    onClick={() => {
                      this.setState({ isOpen: !this.state.isOpen });
                    }}
                  >
                    Reply
                  </Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))
        ) : (
          <Container className="no-comments">There are no comments for this article. Be the first one to comment about this!</Container>
        )}
        {this.props.match.params.comment_status === 'open' ? (
          <Button
            onClick={() => {
              this.setState({ isOpen: !this.state.isOpen });
            }}
          >
            Leave a comment
          </Button>
        ) : null}
        {this.state.isOpen === true ? (
          <Modal open>
            <Icon name="close" onClick={this.showModal} />
            <Header icon="commenting" content="Leave a comment" />
            <Modal.Content>
              <CommentForm onSubmit={this.submit} />
            </Modal.Content>
          </Modal>
        ) : null}
      </Comment.Group>
    );
  }
}

CommentsView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postSlug: PropTypes.string.isRequired,
      postId: PropTypes.string.isRequired,
      categorySlug: PropTypes.string,
      categoryId: PropTypes.string,
      comment_status: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(commentPropType).isRequired,
};
