import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

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
            link: 'http://localhost/cat-1',
          },
          {
            id: 43,
            name: 'Cat 2',
            slug: 'cat-2',
            link: 'http://localhost/cat-2',
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

  it('calculates the number of pages and cards with no categories', () => {
    const componentInstanceNoCategories = renderer.create(
      <CategoriesCarousel.WrappedComponent
        dispatch={jest.fn()}
        loading={0}
        categories={[]}
        sideMenuVisible={false}
        closeMenu={jest.fn()}
        loadMore={false}
      />).getInstance();

    expect(componentInstanceNoCategories.getPageNumber()).toBe(0);
    expect(componentInstanceNoCategories.getNoCards()).toBe(0);
    expect(componentInstanceNoCategories.createCategoriesList(3, 5)).toEqual([[]]);
  });

  it('calculates the number of pages and cards for single card', () => {
    const categories = [
      { id: 1, name: 'Cat 1', slug: 'cat-1', link: 'http://localhost/cat-1' },
      { id: 2, name: 'Cat 2', slug: 'cat-2', link: 'http://localhost/cat-2' },
      { id: 3, name: 'Cat 3', slug: 'cat-3', link: 'http://localhost/cat-3' },
    ];

    const componentInstance = renderer.create(
      <CategoriesCarousel.WrappedComponent
        dispatch={jest.fn()}
        loading={0}
        categories={categories}
        sideMenuVisible={false}
        closeMenu={jest.fn()}
        loadMore={false}
      />).getInstance();

    expect(componentInstance.getPageNumber()).toBe(0);
    expect(componentInstance.getNoCards()).toBe(1);
    expect(componentInstance.createCategoriesList(3, 5)).toEqual([[...categories]]);
  });

  it('calculates the number of cards for two cards', () => {
    const moreCategories = [
      { id: 1, name: 'Cat 1', slug: 'cat-1', link: 'http://localhost/cat-1' },
      { id: 2, name: 'Cat 2', slug: 'cat-2', link: 'http://localhost/cat-2' },
      { id: 3, name: 'Cat 3', slug: 'cat-3', link: 'http://localhost/cat-3' },
      { id: 4, name: 'Cat 4', slug: 'cat-4', link: 'http://localhost/cat-4' },
      { id: 5, name: 'Cat 5', slug: 'cat-5', link: 'http://localhost/cat-5' },
      { id: 6, name: 'Cat 6', slug: 'cat-6', link: 'http://localhost/cat-6' },
      { id: 7, name: 'Cat 7', slug: 'cat-7', link: 'http://localhost/cat-7' },
    ];

    const componentInstance2 = renderer.create(
      <CategoriesCarousel.WrappedComponent
        dispatch={jest.fn()}
        loading={0}
        categories={moreCategories}
        sideMenuVisible={false}
        closeMenu={jest.fn()}
        loadMore={false}
      />).getInstance();

    expect(componentInstance2.getPageNumber()).toBe(0);
    expect(componentInstance2.getNoCards()).toBe(2);
    expect(componentInstance2.createCategoriesList(3, 5)).toEqual(
      [
        [moreCategories[0], moreCategories[1], moreCategories[2]],
        [moreCategories[3], moreCategories[4], moreCategories[5], moreCategories[6]],
      ],
    );
  });

  it('calculates the number of cards for multiple cards', () => {
    const moreCategories2 = [
      { id: 1, name: 'Cat 1', slug: 'cat-1', link: 'http://localhost/cat-1' },
      { id: 2, name: 'Cat 2', slug: 'cat-2', link: 'http://localhost/cat-2' },
      { id: 3, name: 'Cat 3', slug: 'cat-3', link: 'http://localhost/cat-3' },
      { id: 4, name: 'Cat 4', slug: 'cat-4', link: 'http://localhost/cat-4' },
      { id: 5, name: 'Cat 5', slug: 'cat-5', link: 'http://localhost/cat-5' },
      { id: 6, name: 'Cat 6', slug: 'cat-6', link: 'http://localhost/cat-6' },
      { id: 7, name: 'Cat 7', slug: 'cat-7', link: 'http://localhost/cat-7' },
      { id: 8, name: 'Cat 8', slug: 'cat-8', link: 'http://localhost/cat-8' },
      { id: 9, name: 'Cat 9', slug: 'cat-9', link: 'http://localhost/cat-9' },
      { id: 10, name: 'Cat 10', slug: 'cat-10', link: 'http://localhost/cat-10' },
      { id: 11, name: 'Cat 11', slug: 'cat-11', link: 'http://localhost/cat-11' },
      { id: 12, name: 'Cat 12', slug: 'cat-12', link: 'http://localhost/cat-12' },
      { id: 13, name: 'Cat 13', slug: 'cat-13', link: 'http://localhost/cat-13' },
      { id: 14, name: 'Cat 14', slug: 'cat-14', link: 'http://localhost/cat-14' },
    ];

    const componentInstance3 = renderer.create(
      <CategoriesCarousel.WrappedComponent
        dispatch={jest.fn()}
        loading={0}
        categories={moreCategories2}
        sideMenuVisible={false}
        closeMenu={jest.fn()}
        loadMore={false}
      />).getInstance();

    expect(componentInstance3.getPageNumber()).toBe(1);
    expect(componentInstance3.getNoCards()).toBe(4);
  });

  it('disable load more', () => {
    const dispatchSpy = sinon.spy(jest.fn());

    const moreCategories = [
      { id: 1, name: 'Cat 1', slug: 'cat-1', link: 'http://localhost/cat-1' },
      { id: 2, name: 'Cat 2', slug: 'cat-2', link: 'http://localhost/cat-2' },
      { id: 3, name: 'Cat 3', slug: 'cat-3', link: 'http://localhost/cat-3' },
    ];

    const componentInstance = renderer.create(
      <CategoriesCarousel.WrappedComponent
        dispatch={dispatchSpy}
        loading={0}
        categories={moreCategories}
        sideMenuVisible={false}
        closeMenu={jest.fn()}
        loadMore={false}
      />).getInstance();

    componentInstance.loadMore(1); // this call should not trigger dispatch

    // dispatch is also called once by the constructor
    expect(dispatchSpy.calledOnce).toBe(true);
  });

  it('load more categories', () => {
    const dispatchSpy = sinon.spy(jest.fn());

    const moreCategories = [
      { id: 1, name: 'Cat 1', slug: 'cat-1', link: 'http://localhost/cat-1' },
      { id: 2, name: 'Cat 2', slug: 'cat-2', link: 'http://localhost/cat-2' },
      { id: 3, name: 'Cat 3', slug: 'cat-3', link: 'http://localhost/cat-3' },
      { id: 4, name: 'Cat 4', slug: 'cat-4', link: 'http://localhost/cat-4' },
      { id: 5, name: 'Cat 5', slug: 'cat-5', link: 'http://localhost/cat-5' },
      { id: 6, name: 'Cat 6', slug: 'cat-6', link: 'http://localhost/cat-6' },
      { id: 7, name: 'Cat 7', slug: 'cat-7', link: 'http://localhost/cat-7' },
      { id: 8, name: 'Cat 8', slug: 'cat-8', link: 'http://localhost/cat-8' },
      { id: 9, name: 'Cat 9', slug: 'cat-9', link: 'http://localhost/cat-9' },
      { id: 10, name: 'Cat 10', slug: 'cat-10', link: 'http://localhost/cat-10' },
      { id: 11, name: 'Cat 11', slug: 'cat-11', link: 'http://localhost/cat-11' },
      { id: 12, name: 'Cat 12', slug: 'cat-12', link: 'http://localhost/cat-12' },
      { id: 13, name: 'Cat 13', slug: 'cat-13', link: 'http://localhost/cat-13' },
      { id: 14, name: 'Cat 14', slug: 'cat-14', link: 'http://localhost/cat-14' },
    ];

    const componentInstance = renderer.create(
      <CategoriesCarousel.WrappedComponent
        dispatch={dispatchSpy}
        loading={0}
        categories={moreCategories}
        sideMenuVisible={false}
        closeMenu={jest.fn()}
        loadMore
      />).getInstance();

    componentInstance.loadMore(2); // this call should not trigger dispatch
    componentInstance.loadMore(3);

    // dispatch is also called once by the constructor
    expect(dispatchSpy.calledTwice).toBe(true);
  });

  it('hides side bar', () => {
    const closeMenuSpy = sinon.spy(jest.fn());

    const componentInstance = renderer.create(
      <CategoriesCarousel.WrappedComponent
        dispatch={jest.fn()}
        loading={0}
        categories={[]}
        sideMenuVisible
        closeMenu={closeMenuSpy}
        loadMore={false}
      />).getInstance();

    componentInstance.hideSidebar();
    expect(closeMenuSpy.calledOnce).toBe(true);
  });
});
