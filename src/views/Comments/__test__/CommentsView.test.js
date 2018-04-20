import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CommentsView from '../components/CommentsView';

describe('Comments view', () => {
  it('renders no comments, allows adding new comments', () => {
    const comments = [];
    const translations = {
      FORMS: {
        REPLY: 'reply',
      },
      TEXTS: {
        NO_COMMENTS: 'No comments',
        NO_COMMENTS_SHORT: 'No comments',
        LEAVE_COMMENTS: 'Leave comment',
      },
    };
    const postId = '43';
    const loading = 0;
    const commentStatus = 'open';

    const output = shallow(<CommentsView comments={comments} loading={loading} postId={postId} commentStatus={commentStatus} texts={translations} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
  it('renders no comments, does not allow adding new comments', () => {
    const comments = [];
    const translations = {
      FORMS: {
        REPLY: 'reply',
      },
      TEXTS: {
        NO_COMMENTS: 'No comments',
        NO_COMMENTS_SHORT: 'No comments',
        LEAVE_COMMENTS: 'Leave comment',
      },
    };
    const postId = '43';
    const loading = 0;
    const commentStatus = 'closed';

    const output = shallow(<CommentsView comments={comments} loading={loading} postId={postId} commentStatus={commentStatus} texts={translations} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
  it('renders comments, allows adding new comments', () => {
    const comments = [
      {
        id: 67,
        post: 54,
        author_name: 'Comment Author',
        content: {
          rendered: 'Comment content',
        },
        date: 'd date',
        author_avatar_urls: {
          24: 'some-rurl',
        },
      },
    ];
    const translations = {
      FORMS: {
        REPLY: 'reply',
      },
      TEXTS: {
        NO_COMMENTS: 'No comments',
        NO_COMMENTS_SHORT: 'No comments',
        LEAVE_COMMENTS: 'Leave comment',
      },
    };
    const postId = '43';
    const loading = 0;
    const commentStatus = 'open';
    const output = shallow(<CommentsView comments={comments} loading={loading} postId={postId} commentStatus={commentStatus} texts={translations} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
  it('renders comments, does not allow adding new comments', () => {
    const comments = [
      {
        id: 67,
        post: 54,
        author_name: 'Comment Author',
        content: {
          rendered: 'Comment content',
        },
        date: 'd date',
        author_avatar_urls: {
          24: 'some-rurl',
        },
      },
    ];
    const translations = {
      FORMS: {
        REPLY: 'reply',
      },
      TEXTS: {
        NO_COMMENTS: 'No comments',
        NO_COMMENTS_SHORT: 'No comments',
        LEAVE_COMMENTS: 'Leave comment',
      },
    };
    const postId = '43';
    const loading = 0;
    const commentStatus = 'closed';
    const output = shallow(<CommentsView comments={comments} loading={loading} postId={postId} commentStatus={commentStatus} texts={translations} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
