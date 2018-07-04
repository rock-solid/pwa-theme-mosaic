import posts, { INITIAL_STATE, getPosts, getPostsFetching, getLoadMorePosts, getPostsByCategory, getPostProtectedStatus } from '../reducer';
import { requestPosts, receivePosts } from '../action';

describe('Posts reducer', () => {
  it('returns same state on an unhandled action', () => {
    expect(posts(INITIAL_STATE, { type: '_NULL' })).toMatchSnapshot();
  });

  it('handles REQUEST_POSTS action', () => {
    const postsList = {
      isFetching: 0,
      items: [
        {
          id: 1,
          name: 'Nice post',
        },
        {
          id: 2,
          name: 'Nicer post',
        },
      ],
      loadMore: false,
    };
    expect(posts(postsList, requestPosts())).toMatchSnapshot();
  });

  it('handles RECEIVE_POSTS action and adds new posts to the state', () => {
    const postState = {
      isFetching: 1,
      items: [
        {
          id: 1,
          name: 'Nice post',
        },
        {
          id: 2,
          name: 'Nicer post',
        },
      ],
      loadMore: true,
    };

    const response = [
      {
        id: 3,
        name: 'Nicest post',
      },
    ];

    expect(posts(postState, receivePosts(response))).toMatchSnapshot();
  });

  it('handles RECEIVE_POSTS action and merges by post id', () => {
    const postState = {
      isFetching: 1,
      items: [
        {
          id: 1,
          name: 'Nice post',
        },
        {
          id: 2,
          name: 'Nicer post',
        },
      ],
      loadMore: true,
    };

    const response = [
      {
        id: 2,
        name: 'Nicer post',
      },
    ];

    expect(posts(postState, receivePosts(response))).toMatchSnapshot();
  });

  it('handles RECEIVE_POSTS action and continues load more', () => {
    const postState = {
      isFetching: 1,
      items: [
        { id: 1 },
        { id: 2 },
      ],
      loadMore: true,
    };

    const response = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
    ];

    expect(posts(postState, receivePosts(response))).toMatchSnapshot();
  });

  // reducer functions
  it('getPostsFetching returns state.isFetching', () => {
    expect(getPostsFetching(INITIAL_STATE)).toBe(0);
  });

  it('getLoadMorePosts returns state.loadMore', () => {
    const state = {
      loadMore: true,
    };
    expect(getLoadMorePosts(state)).toBe(true);
  });

  it('getPosts returns state.items', () => {
    const state = {
      items: [
        {
          name: 'Some post',
        },
      ],
    };
    expect(getPosts(state)).toBe(state.items);
  });

  it('getPostsByCategory returns posts from category', () => {
    const state = {
      items: [
        {
          name: 'Some post',
          categories: [101, 102],
        },
        {
          name: 'Another post',
          categories: [102, 103],
        },
      ],
    };
    expect(getPostsByCategory(state, 101)).toMatchSnapshot();
    expect(getPostsByCategory(state, 102)).toMatchSnapshot();
    expect(getPostsByCategory(state, 104)).toMatchSnapshot();
  });

  it('getPostProtectedStatus returns true for password protected post and false otherwise', () => {
    const state = {
      items: [
        {
          id: 1,
          name: 'Password protected post',
          content: {
            protected: true,
          },
        },
        {
          id: 2,
          name: 'Public post',
          content: {
            protected: false,
          },
        },
      ],
    };
    expect(getPostProtectedStatus(state, 1)).toBe(true);
    expect(getPostProtectedStatus(state, 2)).toBe(false);

    // non existing post returns a protected status
    expect(getPostProtectedStatus(state, 3)).toBe(true);
    expect(getPostProtectedStatus(INITIAL_STATE, 3)).toBe(true);
  });
});
