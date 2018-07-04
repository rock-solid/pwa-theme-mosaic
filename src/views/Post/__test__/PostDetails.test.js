import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import PostDetails from '../PostDetails';

jest.mock('../components/SocialMedia', () => 'Social media test');
jest.mock('react-global-configuration', () => require.requireActual('../../../__mocks__/react-global-configuration').default);

describe('Post details', () => {
  it('should render post without image', () => {
    const mockPost = {
      id: 1,
      title: {
        rendered: 'Mock title',
      },
      author: 45,
      _embedded: {
        author: [{ id: 45, name: 'Some mock author' }],
        'wp:term': [[
          { id: 1, name: 'Some category', slug: 'some-category-slug-1' },
          { id: 2, name: 'Some category', slug: 'some-category-slug-2' },
          { id: 32, name: 'Some category', slug: 'some-category-slug-32' },
        ]],
      },
      categories: [2, 54, 23, 6],
      slug: 'mock-slug',
      content: {
        rendered: 'Some content that should be rendered',
        protected: false,
      },
      excerpt: {
        rendered: 'Some excerpt to be rendered',
        protected: true,
      },
      link: 'some-post-link',
      date: 'someMockDate',
    };
    const category = {
      match: {
        params: {
          categoryId: '32',
          categorySlug: 'some-slug',
        },
      },
    };
    const output = shallow(<PostDetails post={mockPost} category={category} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render post with featured image', () => {
    const mockPost = {
      id: 1,
      title: {
        rendered: 'Mock title',
      },
      author: 45,
      featured_media: 23,
      _embedded: {
        author: [{ id: 45, name: 'Some mock author' }],
        'wp:term': [[
          { id: 1, name: 'Some category', slug: 'some-category-slug-1' },
          { id: 2, name: 'Some category', slug: 'some-category-slug-2' },
          { id: 32, name: 'Some category', slug: 'some-category-slug-32' },
        ]],
        'wp:featuredmedia': [
          {
            id: 23,
            source_url: 'some-post-image',
          },
        ],
      },
      categories: [2, 54, 23, 6],
      slug: 'mock-slug',
      content: {
        rendered: 'Some content that should be rendered',
        protected: false,
      },
      excerpt: {
        rendered: 'Some excerpt to be rendered',
        protected: true,
      },
      link: 'some-post-link',
      date: 'someMockDate',
    };

    const category = {
      match: {
        params: {
          categoryId: '32',
          categorySlug: 'some-slug',
        },
      },
    };
    const output = shallow(<PostDetails post={mockPost} category={category} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
