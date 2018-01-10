import pages, { INITIAL_STATE, getPages, getPagesFetching } from '../reducer';
import { requestPages, receivePages } from '../action';

describe('Posts reducer', () => {
  it('returns same state on an unhandled action', () => {
    expect(pages(INITIAL_STATE, { type: '_NULL' })).toMatchSnapshot();
  });
  it('handles REQUEST_PAGES action', () => {
    const pageState = {
      isFetching: 0,
      items: [
        {
          id: 1,
          name: 'Nice page',
        },
        {
          id: 2,
          name: 'Nicer page',
        },
      ],
    };
    expect(pages(pageState, requestPages())).toMatchSnapshot();
  });
  it('handles RECEIVE_PAGES action case 1', () => {
    const pageState = {
      isFetching: 1,
      items: [
        {
          id: 1,
          name: 'Nice page',
        },
        {
          id: 2,
          name: 'Nicer page',
        },
      ],
    };
    const pageList = {
      id: 3,
      name: 'Nicest page',
    };
    expect(pages(pageState, receivePages(pageList))).toMatchSnapshot();
  });
  it('handles RECEIVE_PAGES action case 2', () => {
    const pageState = {
      isFetching: 1,
      items: [
        {
          id: 1,
          name: 'Nice page',
        },
        {
          id: 2,
          name: 'Nicer page',
        },
      ],
    };
    const pageList = [
      {
        id: 3,
        name: 'Nicest page',
      },
    ];
    expect(pages(pageState, receivePages(pageList))).toMatchSnapshot();
  });

  // reducer functions
  it('getPagesFetching returns state.isFetching', () => {
    expect(getPagesFetching(INITIAL_STATE)).toBe(0);
  });
  it('getPages returns state.items', () => {
    const state = {
      items: [
        {
          name: 'Some page',
        },
      ],
    };
    expect(getPages(state)).toBe(state.items);
  });
});
