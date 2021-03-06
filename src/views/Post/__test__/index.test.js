import React from 'react';
import renderer from 'react-test-renderer';

import mockStore from '../../../__mocks__/redux-mock-store';
import Post from '../index';

jest.mock('../PostDetails', () => 'Post view test');
jest.mock('react-global-configuration', () => require.requireActual('../../../__mocks__/react-global-configuration'));

describe('Post screen', () => {
  it('should render correctly that a post does not exist', () => {
    const store = mockStore({
      posts: {
        items: [],
        isFetching: 0,
      },
      translations: {
        items: {},
        isFetching: 0,
      },
    });
    const match = {
      params: { postId: 'some-post-id' },
    };
    expect(renderer.create(<Post store={store} fetchPosts={jest.fn()} match={match} />)).toMatchSnapshot();
  });

  it('should render correctly a loader', () => {
    const store = mockStore({
      posts: {
        items: [],
        isFetching: 1,
      },
      translations: {
        items: {},
        isFetching: 1,
      },
    });
    const match = {
      params: { postId: 'some-post-id' },
    };
    expect(renderer.create(<Post store={store} fetchPosts={jest.fn()} match={match} />)).toMatchSnapshot();
  });

  it('should render correctly an existing post', () => {
    const store = mockStore({
      posts: {
        items: [
          {
            id: 1,
            title: {
              rendered: 'Some post title',
            },
            author: 54,
            categories: [1, 4, 2],
            slug: 'some-post-slug',
            content: {
              rendered: 'Some post content to be rendered',
              protected: true,
            },
            excerpt: {
              rendered: 'Some post excerpt to be rendered',
              protected: false,
            },
            date: 'some mock date',
            _embedded: {
              author: [
                {
                  id: 54,
                  name: 'Some author',
                },
              ],
              'wp:term': [[
                { id: 1, name: 'Some category 1', slug: 'some-category-slug-1' },
                { id: 4, name: 'Some category 4', slug: 'some-category-slug-4' },
                { id: 2, name: 'Some category 2', slug: 'some-category-slug-2' },
              ]],
            },
          },
        ],
        isFetching: 0,
      },
      translations: {
        items: {
          TEXTS: {
            BY_AUTHOR: 'by',
            NO_ARTICLES: 'There are no articles!',
          },
        },
        isFetching: 0,
      },
    });
    const match = {
      params: { postId: '1' },
    };
    expect(renderer.create(<Post store={store} fetchPosts={jest.fn()} match={match} />)).toMatchSnapshot();
  });
});
