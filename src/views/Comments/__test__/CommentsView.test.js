import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CommentsView from '../components/CommentsView';

describe('Comments view', () => {
  it('renders no comments, allows adding new comments', () => {
    const comments = [];
    const match = {
      params: {
        postSlug: 'post-slug',
        postId: '43',
        categorySlug: 'category-slug',
        categoryId: '54',
        comment_status: 'open',
      },
    };

    const output = shallow(<CommentsView comments={comments} match={match} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
  it('renders no comments, does not allow adding new comments', () => {
    const comments = [];
    const match = {
      params: {
        postSlug: 'post-slug',
        postId: '43',
        categorySlug: 'category-slug',
        categoryId: '54',
        comment_status: 'close',
      },
    };

    const output = shallow(<CommentsView comments={comments} match={match} />);
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
    const match = {
      params: {
        postSlug: 'post-slug',
        postId: '43',
        categorySlug: 'category-slug',
        categoryId: '54',
        comment_status: 'open',
      },
    };
    const output = shallow(<CommentsView comments={comments} match={match} />);
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
    const match = {
      params: {
        postSlug: 'post-slug',
        postId: '43',
        categorySlug: 'category-slug',
        categoryId: '54',
        comment_status: 'close',
      },
    };
    const output = shallow(<CommentsView comments={comments} match={match} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
