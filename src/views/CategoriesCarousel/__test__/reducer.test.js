import categories, { INITIAL_STATE, getCategories, getCategoriesFetching, getLoadMoreCategories, getCategory } from '../reducer';
import { requestCategories, receiveCategories } from '../action';

describe('Categories reducer', () => {
  it('returns the same state on an unhandled action', () => {
    expect(categories(INITIAL_STATE, { type: '_NULL' })).toMatchSnapshot();
  });

  it('handles REQUEST_CATEGORIES action', () => {
    const categoriesList = {
      isFetching: 0,
      items: [
        {
          id: 1,
          name: 'Nice one',
        },
        {
          id: 2,
          name: 'Nicer one',
        },
      ],
      loadMore: false,
    };
    expect(categories(categoriesList, requestCategories())).toMatchSnapshot();
  });

  it('handles RECEIVE_CATEGORIES action and adds new categories to the state', () => {
    const categoriesState = {
      isFetching: 1,
      items: [
        {
          id: 1,
          name: 'Nice one',
        },
        {
          id: 2,
          name: 'Nicer one',
        },
      ],
      loadMore: true,
    };
    const categoriesList = [
      {
        id: 3,
        name: 'Nicest one',
      },
    ];
    expect(categories(categoriesState, receiveCategories(categoriesList))).toMatchSnapshot();
  });

  it('handles RECEIVE_CATEGORIES action and adds new category to the state', () => {
    const categoriesState = {
      isFetching: 1,
      items: [
        {
          id: 1,
          name: 'Nice one',
        },
        {
          id: 2,
          name: 'Nicer one',
        },
      ],
      loadMore: true,
    };

    const category = {
      id: 3,
      name: 'Nicest one',
    };

    expect(categories(categoriesState, receiveCategories(category))).toMatchSnapshot();
  });

  it('handles RECEIVE_CATEGORIES action and continues load more', () => {
    const categoriesState = {
      isFetching: 1,
      items: [
        {
          id: 1,
          name: 'Nice one',
        },
        {
          id: 2,
          name: 'Nicer one',
        },
      ],
      loadMore: true,
    };
    const categoriesList = [
      {
        id: 3,
        name: 'Nicest one',
      },
      {
        id: 4,
        name: 'Another category',
      },
    ];
    expect(categories(categoriesState, receiveCategories(categoriesList, 2))).toMatchSnapshot();
  });

  it('handles RECEIVE_CATEGORIES action and disables load more', () => {
    const categoriesState = {
      isFetching: 1,
      items: [
        {
          id: 1,
          name: 'Nice one',
        },
        {
          id: 2,
          name: 'Nicer one',
        },
      ],
      loadMore: true,
    };
    const categoriesList = [
      {
        id: 3,
        name: 'Nicest one',
      },
    ];
    expect(categories(categoriesState, receiveCategories(categoriesList, 10))).toMatchSnapshot();
  });

  // reducer functions
  it('getCategoriesFetching returns state.isFetching', () => {
    const state = {
      isFetching: 4,
    };
    expect(getCategoriesFetching(state)).toBe(4);
  });

  it('getCategories returns state.items', () => {
    const state = {
      items: [
        {
          name: 'Nice one',
        },
      ],
    };
    expect(getCategories(state)).toBe(state.items);
  });

  it('getCategory finds category by id', () => {
    const state = {
      items: [
        {
          id: 1,
          name: 'Nice one',
        },
      ],
    };
    expect(getCategory(state, 1)).toBe(state.items[0]);
    expect(getCategory(state, 2)).toBe(undefined);
  });

  it('getLoadMoreCategories returns state.loadMore', () => {
    const state = {
      loadMore: true,
    };
    expect(getLoadMoreCategories(state)).toBe(true);
  });
});
