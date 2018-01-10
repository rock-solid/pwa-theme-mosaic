import posts, { INITIAL_STATE, getPosts, getPostsFetching } from '../reducer';
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
    };
    expect(posts(postsList, requestPosts())).toMatchSnapshot();
  });
  it('handles RECEIVE_POSTS action case 1', () => {
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
    };
    const postsList = [
      {
        id: 3,
        name: 'Nicest post',
      },
    ];
    expect(posts(postState, receivePosts(postsList))).toMatchSnapshot();
  });
  it('handles RECEIVE_POSTS action case 2', () => {
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
    };
    const postsList = {
      id: 3,
      name: 'Nicest post',
    };
    expect(posts(postState, receivePosts(postsList))).toMatchSnapshot();
  });

  // reducer functions
  it('getPostsFetching returns state.isFetching', () => {
    expect(getPostsFetching(INITIAL_STATE)).toBe(0);
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
});
