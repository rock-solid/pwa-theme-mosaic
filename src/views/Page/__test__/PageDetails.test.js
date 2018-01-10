import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import PageDetails from '../PageDetails';

describe('Page details', () => {
  it('renders page details', () => {
    const page = {
      id: 12,
      parent: 43,
      title: {
        rendered: 'Some title',
      },
      slug: 'some-title',
      content: {
        rendered: 'Some content for some page',
      },
      link: 'some-link',
      author: 32,
      featured_media: 43,
      _embedded: {
        author: 'Some author',
        'wp:featuredmedia': 'some-image',
      },
      comment_status: 'some-status',
      status: 'some-status',
    };
    const output = shallow(<PageDetails page={page} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
