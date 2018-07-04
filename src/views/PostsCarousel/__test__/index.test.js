import React from 'react';
import renderer from 'react-test-renderer';

import mockStore from '../../../__mocks__/redux-mock-store';
import PostsCarousel from '../index';

jest.mock('../components/PostsList/index', () => 'Posts list mock');
jest.mock('../../../components/Footer/index', () => 'Footer mock');

jest.mock('react-slick', () => require.requireActual('../../../__mocks__/react-slick').default);
jest.mock('react-global-configuration', () => require.requireActual('../../../__mocks__/react-global-configuration').default);

describe('Posts carousel', () => {
  it('renders posts', () => {
    const store = mockStore({
      posts: {
        items: [
          {
            id: 53,
            title: {
              rendered: 'Post 1',
            },
            author: 56,
            categories: [43, 54, 6],
            slug: 'post-1',
            content: {
              rendered: 'Post mock content',
              protected: false,
            },
            excerpt: {
              rendered: 'Post excerpt',
              protected: false,
            },
            date: 'some mock date',
          },
        ],
        isFetching: 0,
        loadMore: false,
      },
      categories: {
        items: [
          {
            id: 32,
            name: 'Cat 1',
            slug: 'cat-1',
          },
          {
            id: 43,
            name: 'Cat 2',
            slug: 'cat-2',
          },
        ],
        isFetching: 0,
      },
      translations: {
        items: {
          TEXTS: {},
        },
        isFetching: 0,
      },
    });

    const match = {
      params: {
        categoryId: '35',
        categorySlug: 'some-category-slug',
      },
    };

    expect(renderer.create(<PostsCarousel match={match} store={store} fetchPosts={jest.fn()} />)).toMatchSnapshot();
  });
  it('renders loader', () => {
    const store = mockStore({
      posts: {
        items: [],
        isFetching: 1,
        loadMore: false,
      },
      categories: {
        items: [],
        isFetching: 1,
      },
      translations: {
        items: {},
        isFetching: 1,
      },
    });

    const match = {
      params: {
        categoryId: '35',
        categorySlug: 'some-category-slug',
      },
    };
    expect(renderer.create(<PostsCarousel match={match} store={store} fetchCategories={jest.fn()} />)).toMatchSnapshot();
  });
});
