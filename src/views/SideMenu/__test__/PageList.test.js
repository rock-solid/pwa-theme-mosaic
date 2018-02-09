import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import PageList from '../PageList';

describe('Page list', () => {
  it('renders page list in side menu', () => {
    const pages = [
      {
        id: 53,
        parent: 5,
        title: {
          rendered: 'Page Title',
        },
        slug: 'page-slug',
        content: {
          rendered: 'Page content',
        },
        link: 'page-link',
        author: 68,
        comment_status: 'open',
        featured_media: 36,
        status: 'status',
      },
    ];
    const output = shallow(<PageList pages={pages} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
