import React from 'react';
import { Header, Comment, Icon, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';

import './style.css';

const CommentsView = (props) => {
  let path = {};
  if (_.isNil(props.match.params.categorySlug)) {
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
    </Comment.Group>
  );
};

CommentsView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postSlug: PropTypes.string.isRequired,
      postId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  comments: PropTypes.any.isRequired, // TO DO VALIDATION
};

export default CommentsView;
