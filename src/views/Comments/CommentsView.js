import React, { Component } from 'react';
import { Header, Comment, Icon, Container, Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

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
                  <div>
                    <Moment format="MMMM DD, YYYY">{comment.date}</Moment>
                  </div>
                </Comment.Metadata>
                <Comment.Text dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
                <Comment.Actions>
                  <Comment.Action
                    onClick={() => {
                      this.setState({ isOpen: !this.state.isOpen });
                    }}
                  >
                    {this.props.texts.FORMS && this.props.texts.FORMS.REPLY}
                  </Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))
        ) : (
          <Container className="no-comments">
            {this.props.match.params.comment_status === 'open'
              ? this.props.texts.TEXTS && this.props.texts.TEXTS.NO_COMMENTS
              : this.props.texts.TEXTS && this.props.texts.TEXTS.NO_COMMENTS_SHORT}
          </Container>
        )}
        {this.props.match.params.comment_status === 'open' ? (
          <Button
            onClick={() => {
              this.setState({ isOpen: !this.state.isOpen });
            }}
          >
            {this.props.texts.TEXTS && this.props.texts.TEXTS.LEAVE_COMMENTS}
          </Button>
        ) : null}
        {this.state.isOpen === true ? (
          <Modal open>
            <Icon name="close" onClick={this.showModal} />
            <Header icon="commenting" content={this.props.texts.TEXTS && this.props.texts.TEXTS.LEAVE_COMMENTS} />
            <Modal.Content>
              <CommentForm onSubmit={this.submit} texts={this.props.texts} />
            </Modal.Content>
          </Modal>
        ) : null}
      </Comment.Group>
    );
  }
}

CommentsView.defaultProps = {
  texts: {
    FORMS: {
      REPLY: 'Reply',
    },
    TEXTS: {
      NO_COMMENTS: 'No comments',
      NO_COMMENTS_SHORT: 'No comments',
      LEAVE_COMMENTS: 'Leave comment',
    },
  },
};
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
  texts: PropTypes.shape({
    FORMS: PropTypes.shape({
      REPLY: PropTypes.string,
    }),
    TEXTS: PropTypes.shape({
      NO_COMMENTS: PropTypes.string,
      NO_COMMENTS_SHORT: PropTypes.string,
      LEAVE_COMMENTS: PropTypes.string,
    }),
  }),
};
