import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import mockStore from '../../../__mocks__/redux-mock-store';

import Comments from '../index';

jest.mock('../components/CommentsView', () => 'Comments view test');
jest.mock('../../../components/NotFound/index', () => 'Not found component test');

describe('Comments screen', () => {
  it('renders a message if the page does not exist', () => {
    const store = mockStore({
      comments: {
        items: [],
        isFetching: 0,
      },
      posts: {
        items: [
          {
            id: 54,
            name: 'Test post',
            content: {
              protected: false,
            },
          },
        ],
        isFetching: 0,
        loadMore: false,
      },
      translations: {
        items: {},
        isFetching: 0,
      },
    });
    const match = {
      params: {
        categoryId: '42',
        categorySlug: 'category-slug',
        postId: '54',
        postSlug: 'post-slug',
        commentStatus: 'closed',
      },
    };
    expect(
      renderer.create(
        <MemoryRouter>
          <Comments store={store} fetchComments={jest.fn()} match={match} />
        </MemoryRouter>,
      ),
    ).toMatchSnapshot();
  });

  it('renders comments list', () => {
    const store = mockStore({
      comments: {
        items: [
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
        ],
        isFetching: 0,
      },
      posts: {
        items: [
          {
            id: 54,
            name: 'Test post',
            content: {
              protected: false,
            },
          },
        ],
        isFetching: 0,
        loadMore: false,
      },
      translations: {
        items: {
          TEXTS: {
            COMMENTS: 'Comments',
          },
        },
        isFetching: 0,
      },
    });
    const match = {
      params: {
        categoryId: '42',
        categorySlug: 'category-slug',
        postId: '54',
        postSlug: 'post-slug',
        commentStatus: 'open',
      },
    };
    expect(
      renderer.create(
        <MemoryRouter>
          <Comments store={store} fetchComments={jest.fn()} match={match} isProtectedPost={false} />
        </MemoryRouter>,
      ),
    ).toMatchSnapshot();
  });
});
