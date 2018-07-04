import React from 'react';
import renderer from 'react-test-renderer';

import mockStore from '../../../__mocks__/redux-mock-store';
import CategoriesCarousel from '../index';

jest.mock('../components/CategoriesList/index', () => 'Categories list mock');
jest.mock('../../../components/NavBar/index', () => 'Navbar mock');
jest.mock('../../SideMenu/index', () => 'Page side menu mock');

jest.mock('react-slick', () => require.requireActual('../../../__mocks__/react-slick').default);
jest.mock('react-global-configuration', () => require.requireActual('../../../__mocks__/react-global-configuration').default);

describe('Categories carousel', () => {
  it('renders categories', () => {
    const store = mockStore({
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
        loadMore: false,
      },
      sideMenuVisible: false,
    });
    expect(renderer.create(<CategoriesCarousel store={store} fetchCategories={jest.fn()} closeMenu={jest.fn()} />)).toMatchSnapshot();
  });
  it('renders loader', () => {
    const store = mockStore({
      categories: {
        items: [],
        isFetching: 1,
        loadMore: false,
      },
      sideMenuVisible: false,
    });
    expect(renderer.create(<CategoriesCarousel store={store} fetchCategories={jest.fn()} closeMenu={jest.fn()} />)).toMatchSnapshot();
  });
});
