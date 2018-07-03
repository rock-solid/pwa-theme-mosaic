import pages, { INITIAL_STATE, getPages, getPagesFetching } from '../reducer';
import { requestPages, receivePages } from '../action';

describe('Pages reducer', () => {
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
          content: {
            protected: false,
          },
        },
        {
          id: 2,
          name: 'Nicer page',
          content: {
            protected: false,
          },
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
          content: {
            protected: false,
          },
        },
        {
          id: 2,
          name: 'Nicer page',
          content: {
            protected: false,
          },
        },
      ],
    };

    const pageList = {
      id: 3,
      name: 'Nicest page',
      content: {
        protected: false,
      },
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
          content: {
            protected: false,
          },
        },
        {
          id: 2,
          name: 'Nicer page',
          content: {
            protected: false,
          },
        },
      ],
    };
    const pageList = [
      {
        id: 3,
        name: 'Nicest page',
        content: {
          protected: false,
        },
      },
    ];
    expect(pages(pageState, receivePages(pageList))).toMatchSnapshot();
  });

  it('handles RECEIVE_PAGES with password protected pages keeps same state', () => {
    const pageState = {
      isFetching: 1,
      items: [
        {
          id: 1,
          name: 'Nice page',
          content: {
            protected: false,
          },
        },
        {
          id: 2,
          name: 'Nicer page',
          content: {
            protected: false,
          },
        },
      ],
    };

    const pageList = [
      {
        id: 3,
        name: 'Nicest page',
        content: {
          protected: true,
        },
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
          id: 1,
          name: 'Some page',
        },
      ],
    };
    expect(getPages(state)).toBe(state.items);
  });
});
