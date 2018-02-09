import comments, { INITIAL_STATE, getComments, getCommentsFetching } from '../reducers';
import { requestComments, receiveComments } from '../actions';

describe('Comments reducer', () => {
  it('returns same state on an unhandled action', () => {
    expect(comments(INITIAL_STATE, { type: '_NULL' })).toMatchSnapshot();
  });
  it('handles REQUEST_COMMENTS action', () => {
    const commentsList = {
      isFetching: 0,
      items: [
        {
          id: 43,
          post: 63,
          author_name: 'Some Author',
          content: {
            rendered: 'Some comment content',
          },
          date: 'some-date',
        },
        {
          id: 43,
          post: 63,
          author_name: 'Some Author',
          content: {
            rendered: 'Some comment content',
          },
          date: 'some-date',
        },
      ],
    };
    expect(comments(commentsList, requestComments())).toMatchSnapshot();
  });
  it('handles RECEIVE_COMMENTS action case 1', () => {
    const postState = {
      isFetching: 1,
      items: [
        {
          id: 43,
          post: 63,
          author_name: 'Some Author',
          content: {
            rendered: 'Some comment content',
          },
          date: 'some-date',
        },
        {
          id: 43,
          post: 63,
          author_name: 'Some Author',
          content: {
            rendered: 'Some comment content',
          },
          date: 'some-date',
        },
      ],
    };
    const commentsList = [
      {
        id: 43,
        post: 63,
        author_name: 'Some Author',
        content: {
          rendered: 'Some comment content',
        },
        date: 'some-date',
      },
    ];
    expect(comments(postState, receiveComments(commentsList))).toMatchSnapshot();
  });
  it('handles RECEIVE_COMMENTS action case 2', () => {
    const postState = {
      isFetching: 1,
      items: [
        {
          id: 43,
          post: 63,
          author_name: 'Some Author',
          content: {
            rendered: 'Some comment content',
          },
          date: 'some-date',
        },
        {
          id: 43,
          post: 63,
          author_name: 'Some Author',
          content: {
            rendered: 'Some comment content',
          },
          date: 'some-date',
        },
      ],
    };
    const commentsList = {
      id: 43,
      post: 63,
      author_name: 'Some Author',
      content: {
        rendered: 'Some comment content',
      },
      date: 'some-date',
    };
    expect(comments(postState, receiveComments(commentsList))).toMatchSnapshot();
  });

  // reducer functions
  it('getCommentsFetching returns state.isFetching', () => {
    expect(getCommentsFetching(INITIAL_STATE)).toBe(0);
  });
  it('getComments returns state.items', () => {
    const state = {
      items: [
        {
          id: 43,
          post: 63,
          author_name: 'Some Author',
          content: {
            rendered: 'Some comment content',
          },
          date: 'some-date',
        },
      ],
    };
    expect(getComments(state)).toBe(state.items);
  });
});
