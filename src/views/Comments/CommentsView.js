import React from 'react';
import { Header, Comment, Icon, Container, Button, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { addComment } from './actions';
import { commentPropType } from './reducers';
import CommentForm from '../../components/Form/index';
import './style.css';

const CommentsView = (props) => {
  let path = {};
  if (_.isNil(props.match.params.categorySlug) || _.isNil(props.match.params.categoryId)) {
    path = '/post/' + props.match.params.postSlug + '/' + props.match.params.postId;
  } else {
    path =
      '/category/' +
      props.match.params.categorySlug +
      '/' +
      props.match.params.categoryId +
      '/post/' +
      props.match.params.postSlug +
      '/' +
      props.match.params.postId;
  }

  const submit = (values) => {
    const params = {
      author_name: values.name,
      email: values.email,
      content: {
        rendered: values.content,
      },
      date: new Date(),
      post: props.match.params.postId,
    };
    addComment(params);
    console.log(values);
  };
  console.log(props);
  return (
    <Comment.Group>
      <Header as="h3" block>
        Comments
        <Link to={path}>
          <Icon name="close" />
        </Link>
      </Header>
      {props.comments.length > 0 ? (
        props.comments.map(comment => (
          <Comment key={comment.id + comment.author}>
            <Comment.Avatar src={comment.author_avatar_urls[24]} />
            <Comment.Content>
              <Comment.Author as="a">{comment.author_name}</Comment.Author>
              <Comment.Metadata>
                <div>{comment.date}</div>
              </Comment.Metadata>
              <Comment.Text dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))
      ) : (
        <Container className="no-comments">There are no comments for this article. Be the first one to comment about this!</Container>
      )}
      {props.match.params.comment_status === 'open' ? (
        <Modal trigger={<Button>Leave a comment</Button>} closeIcon>
          <Header icon="commenting" content="Leave a comment" />
          <Modal.Content>
            <CommentForm onSubmit={submit} />
          </Modal.Content>
        </Modal>
      ) : null}
    </Comment.Group>
  );
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
};

export default CommentsView;
