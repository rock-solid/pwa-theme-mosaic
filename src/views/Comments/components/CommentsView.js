import React, { Component } from 'react';
import { Header, Comment, Icon, Container, Button, Modal, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ReactMoment from 'react-moment';
import Moment from 'moment';
import config from 'react-global-configuration';
import { addComment } from '../actions';
import { commentPropType } from '../reducers';
import CommentForm from '../../../components/Form/index';

import './style.css';

class CommentsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.submit = this.submit.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  submit(values) {
    const params = {
      author_name: values.name,
      author_email: values.email,
      content: values.content,
      date: new Moment().format(),
      post: Number(this.props.postId),
    };
    addComment(params);
  }

  showModal() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    if (this.props.loading) {
      return (
        <Comment.Group className="post-comments">
          <Loader active />
        </Comment.Group>
      );
    }

    return (
      <Comment.Group className="post-comments">
        {this.props.comments.length > 0 ? (
          this.props.comments.map(comment => (
            <Comment key={String(comment.id) + String(comment.content.rendered.length)}>
              <Comment.Avatar src={comment.author_avatar_urls[24]} />
              <Comment.Content>
                <Comment.Author as="a" href={comment.author_url}>
                  {comment.author_name}
                </Comment.Author>
                <Comment.Metadata>
                  <div>
                    <ReactMoment format="MMMM DD, YYYY">{comment.date}</ReactMoment>
                  </div>
                </Comment.Metadata>
                <Comment.Text dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
                <Comment.Actions>
                  <Comment.Action onClick={this.showModal}>
                    {this.props.texts.FORMS && this.props.texts.FORMS.REPLY}
                  </Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))
        ) : (
          <Container className="no-comments">
            {this.props.commentStatus === 'open'
              ? this.props.texts.TEXTS && this.props.texts.TEXTS.NO_COMMENTS
              : this.props.texts.TEXTS && this.props.texts.TEXTS.NO_COMMENTS_SHORT}
          </Container>
        )}

        {config.get('commentsEnabled') === 1 && this.props.commentStatus === 'open' ? (
          <Button onClick={this.showModal}>
            {this.props.texts.TEXTS && this.props.texts.TEXTS.LEAVE_COMMENTS}
          </Button>
        ) : null}

        {this.state.isOpen === true ? (
          <Modal open className="comments-modal">
            <Icon link name="close" onClick={this.showModal} />
            <Header
              icon="commenting"
              content={this.props.texts.TEXTS && this.props.texts.TEXTS.LEAVE_COMMENTS}
            />
            <Modal.Content>
              <CommentForm onSubmit={this.submit} texts={this.props.texts} />
            </Modal.Content>
          </Modal>
        ) : null}
      </Comment.Group>
    );
  }
}

CommentsView.propTypes = {
  postId: PropTypes.string.isRequired,
  commentStatus: PropTypes.oneOf(['open', 'closed', 'disabled']).isRequired,
  comments: PropTypes.arrayOf(commentPropType).isRequired,
  loading: PropTypes.number.isRequired,
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

export default CommentsView;
