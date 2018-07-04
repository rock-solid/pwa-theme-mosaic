import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import PostsList from '../index';

describe('Posts list', () => {
  it('should render correctly even number of posts', () => {
    const mockEvenPosts = [
      {
        id: 1,
        title: {
          rendered: 'Mock title',
        },
        author: 55,
        categories: [1],
        slug: 'mock-slug',
        content: {
          rendered: 'Some mock content to be rendered',
          protected: false,
        },
        excerpt: {
          rendered: 'Some mock exceprt to be rendered',
          protected: true,
        },
        date: 'some mock date',
        _embedded: {
          'wp:term': [[
            { id: 1, name: 'Cat 1', slug: 'cat-1' },
          ]],
          author: [
            {
              id: 55,
              name: 'Some author',
            },
          ],
        },
      },
      {
        id: 2,
        title: {
          rendered: 'Mock title',
        },
        author: 55,
        categories: [1],
        slug: 'mock-slug',
        content: {
          rendered: 'Some mock content to be rendered',
          protected: false,
        },
        featured_media: 3,
        excerpt: {
          rendered: 'Some mock exceprt to be rendered',
          protected: true,
        },
        date: 'some mock date',
        _embedded: {
          'wp:term': [[
            { id: 1, name: 'Cat 1', slug: 'cat-1' },
          ]],
          author: [
            {
              id: 55,
              name: 'Some author',
            },
          ],
          'wp:featuredmedia': [
            { id: 3, source_url: 'someMockImageUrl' },
          ],
        },
      },
    ];
    const category = {
      params: {
        categoryId: '32',
        categorySlug: 'some-slug',
      },
    };
    const output = shallow(<PostsList postsList={mockEvenPosts} category={category} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render correctly odd number of posts', () => {
    const mockOddPosts = [
      {
        id: 1,
        title: {
          rendered: 'Mock title',
        },
        author: 55,
        categories: [43, 54, 23],
        slug: 'mock-slug',
        content: {
          rendered: 'Some mock content to be rendered',
          protected: false,
        },
        excerpt: {
          rendered: 'Some mock exceprt to be rendered',
          protected: true,
        },
        date: 'some mock date',
        _embedded: {
          'wp:term': [[
            { id: 1, name: 'Cat 1', slug: 'cat-1' },
          ]],
          author: [
            {
              id: 55,
              name: 'Some author',
            },
          ],
        },
      },
    ];
    const category = {
      params: {
        categoryId: '32',
        categorySlug: 'some-slug',
      },
    };
    const output = shallow(<PostsList postsList={mockOddPosts} category={category} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
