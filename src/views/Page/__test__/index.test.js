import React from 'react';
import renderer from 'react-test-renderer';

import mockStore from '../../../__mocks__/redux-mock-store';

import PageView from '../index';

jest.mock('../PageDetails', () => 'Page details test');
jest.mock('../../../components/NotFound/', () => 'Not found component test');
jest.mock('react-global-configuration', () => require.requireActual('../../../__mocks__/react-global-configuration').default);

describe('Page screen', () => {
  it('renders a message if the page does not exist', () => {
    const store = mockStore({
      pages: {
        items: [],
        isFetching: 0,
      },
      translations: {
        items: {},
        isFetching: 0,
      },
    });
    const match = {
      params: {
        pageId: '1',
      },
    };
    expect(renderer.create(<PageView store={store} fetchPages={jest.fn()} match={match} />)).toMatchSnapshot();
  });

  it('renders loader', () => {
    const store = mockStore({
      pages: {
        items: [],
        isFetching: 1,
      },
      translations: {
        items: {},
        isFetching: 0,
      },
    });
    const match = {
      params: {
        pageId: '1',
      },
    };
    expect(renderer.create(<PageView store={store} fetchPages={jest.fn()} match={match} />)).toMatchSnapshot();
  });

  it('renders existing pages', () => {
    const store = mockStore({
      pages: {
        items: [
          {
            id: 1,
            parent: 32,
            title: {
              rendered: 'Some page tile',
            },
            slug: 'some-page-slug',
            content: {
              rendered: 'Some page content ot be rendered',
            },
            link: 'some-page-link',
            author: 54,
            comment_status: 'dunno',
            featured_media: 43,
            status: 'some-status',
            _embedded: {
              author: [
                {
                  id: 54,
                  name: 'Some author',
                },
              ],
            },
          },
          {
            id: 3,
            parent: 34,
            title: {
              rendered: 'Some other page tile',
            },
            slug: 'some-other-page-slug',
            content: {
              rendered: 'Some page content ot be rendered',
            },
            link: 'some-page-link',
            author: 54,
            comment_status: 'dunno',
            featured_media: 43,
            status: 'some-status',
            _embedded: {
              author: [
                {
                  id: 54,
                  name: 'Some author',
                },
              ],
            },
          },
        ],
        isFetching: 0,
      },
      translations: {
        items: {
          TEXTS: {
            BY_AUTHOR: 'by',
            NO_PAGES: 'There are no pages!',
          },
        },
        isFetching: 0,
      },
    });
    const match = {
      params: {
        pageId: '1',
      },
    };
    expect(renderer.create(<PageView store={store} fetchPages={jest.fn()} match={match} />)).toMatchSnapshot();
  });
});
