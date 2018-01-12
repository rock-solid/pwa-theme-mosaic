import React from 'react';
import { Header, Comment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './style.css';

const CommentsView = (props) => {
  console.log(props);
  return (
    <Comment.Group>
      <Header as="h3" block>
        Comments
        <Link to={'/post/' + props.match.params.postSlug + '/' + props.match.params.postId}>
          <Icon name="close" />
        </Link>
      </Header>
      {props.comments.map(comment => (
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
      ))}
    </Comment.Group>
  );
};

export default CommentsView;
