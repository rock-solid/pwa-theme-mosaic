import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import mockStore from '../../../__mocks__/redux-mock-store';
import PostsCarousel from '../index';

jest.mock('../components/PostsList/index', () => 'Posts list mock');
jest.mock('../../../components/Footer/index', () => 'Footer mock');

jest.mock('react-slick', () => require.requireActual('../../../__mocks__/react-slick').default);
jest.mock('react-global-configuration', () => require.requireActual('../../../__mocks__/react-global-configuration').default);

describe('Posts carousel', () => {
  it('renders posts container', () => {
    const store = mockStore({
      posts: {
        items: [
          {
            id: 53,
            title: {
              rendered: 'Post 1',
            },
            author: 56,
            categories: [32, 54, 6],
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
            _embedded: {
              'wp:term': [[
                { id: 32, name: 'Cat 1', slug: 'cat-1' },
                { id: 54, name: 'Some category', slug: 'some-category-slug-2' },
                { id: 6, name: 'Some category', slug: 'some-category-slug-32' },
              ]],
              author: [
                {
                  id: 56,
                  name: 'Some author',
                },
              ],
            },
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
        categoryId: '32',
        categorySlug: 'cat-1',
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

  it('calculates the number of pages and cards with no post', () => {
    const match = {
      params: {
        categoryId: '35',
        categorySlug: 'some-category-slug',
      },
    };

    const componentInstance = renderer.create(
      <PostsCarousel.WrappedComponent
        dispatch={jest.fn()}
        posts={[]}
        loading={0}
        loadMore={false}
        match={match}
        category={undefined}
      />).getInstance();

    expect(componentInstance.getPageNumber()).toBe(0);
    expect(componentInstance.getNoCards()).toBe(0);
    expect(componentInstance.createPostsList(3)).toEqual([]);
  });

  it('calculates the number of pages and cards for single card', () => {
    const match = {
      params: {
        categoryId: '32',
        categorySlug: 'cat-1',
      },
    };

    const category = { id: 32, name: 'Cat 1', slug: 'cat-1' };

    const posts = [];

    for (let i = 1; i <= 2; i += 1) {
      posts.push(
        {
          id: i,
          title: {
            rendered: 'Post ' + String(i),
          },
          content: {
            rendered: 'Post content ' + String(i),
            protected: false,
          },
          excerpt: {
            rendered: 'Post excerpt',
            protected: false,
          },
          date: '2018-07-05 00:05:00',
          author: 3,
          categories: [32],
          slug: 'post-' + String(i),
          _embedded: {
            'wp:term': [[{ ...category }]],
            author: [{ id: 3, name: 'Some author' }],
          },
        });
    }

    const componentInstance = renderer.create(
      <PostsCarousel.WrappedComponent
        dispatch={jest.fn()}
        posts={posts}
        loading={0}
        loadMore={false}
        match={match}
        category={undefined}
      />).getInstance();

    expect(componentInstance.getPageNumber()).toBe(0);
    expect(componentInstance.getNoCards()).toBe(1);
    expect(componentInstance.createPostsList(3)).toEqual([[...posts]]);
  });

  it('calculates the number of pages and cards for multiple cards', () => {
    const match = {
      params: {
        categoryId: '32',
        categorySlug: 'cat-1',
      },
    };

    const category = { id: 32, name: 'Cat 1', slug: 'cat-1' };

    const posts = [];

    for (let i = 1; i <= 9; i += 1) {
      posts.push(
        {
          id: i,
          title: {
            rendered: 'Post ' + String(i),
          },
          content: {
            rendered: 'Post content ' + String(i),
            protected: false,
          },
          excerpt: {
            rendered: 'Post excerpt',
            protected: false,
          },
          date: '2018-07-05 00:05:00',
          author: 3,
          categories: [32],
          slug: 'post-' + String(i),
          _embedded: {
            'wp:term': [[{ ...category }]],
            author: [{ id: 3, name: 'Some author' }],
          },
        });
    }

    const componentInstance = renderer.create(
      <PostsCarousel.WrappedComponent
        dispatch={jest.fn()}
        posts={posts}
        loading={0}
        loadMore={false}
        match={match}
        category={undefined}
      />).getInstance();

    expect(componentInstance.getPageNumber()).toBe(1);
    expect(componentInstance.getNoCards()).toBe(5);
    expect(componentInstance.createPostsList(2)).toEqual(
      [
        [posts[0], posts[1]],
        [posts[2], posts[3]],
        [posts[4], posts[5]],
        [posts[6], posts[7]],
        [posts[8]],
      ],
    );
  });

  it('load more posts', () => {
    const match = {
      params: {
        categoryId: '32',
        categorySlug: 'cat-1',
      },
    };

    const category = { id: 32, name: 'Cat 1', slug: 'cat-1' };

    const posts = [];

    for (let i = 1; i <= 3; i += 1) {
      posts.push(
        {
          id: i,
          title: {
            rendered: 'Post ' + String(i),
          },
          content: {
            rendered: 'Post content ' + String(i),
            protected: false,
          },
          excerpt: {
            rendered: 'Post excerpt',
            protected: false,
          },
          date: '2018-07-05 00:05:00',
          author: 3,
          categories: [32],
          slug: 'post-' + String(i),
          _embedded: {
            'wp:term': [[{ ...category }]],
            author: [{ id: 3, name: 'Some author' }],
          },
        });
    }

    const dispatchSpy = sinon.spy(jest.fn());

    const componentInstance = renderer.create(
      <PostsCarousel.WrappedComponent
        dispatch={dispatchSpy}
        posts={posts}
        loading={0}
        loadMore
        match={match}
        category={category}
      />).getInstance();

    componentInstance.loadMore(1); // this call should dispatch to be called twice

    // dispatch is also called three times by the constructor
    expect(dispatchSpy.callCount).toBe(5);
  });
});
