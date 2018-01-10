import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import PostView from '../PostView';

describe('Post card', () => {
  it('should render post with image placeholder', () => {
    const mockPost = {
      id: 1,
      title: {
        rendered: 'Mock title',
      },
      author: 45,
      _embedded: {
        author: 'Some mock author',
        'wp:term': [[{ id: 1, name: 'Some category' }, { id: 2, name: 'Some category' }, { id: 3, name: 'Some category' }]],
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
      date: 'someMockDate', //TO DO : date validation => class Date
      // TO DO : proptype for image src
    };
    const output = shallow(<PostView post={mockPost} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render post with featured image', () => {
    const mockPost = {
      id: 1,
      title: {
        rendered: 'Mock title',
      },
      author: 45,
      _embedded: {
        author: 'Some mock author',
        'wp:term': [[{ id: 1, name: 'Some category' }, { id: 2, name: 'Some category' }, { id: 3, name: 'Some category' }]],
        'wp:featuredmedia': 'some-post-image',
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
      date: 'someMockDate', //TO DO : date validation => class Date
      // TO DO : proptype for image src
    };
    const output = shallow(<PostView post={mockPost} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
