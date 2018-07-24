import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TwoCards from '../TwoCards';

describe('Two cards', () => {
  it('should render correctly', () => {
    const mockCategory = [
      {
        slug: 'mock-slug-1',
        id: 1,
        name: 'Some mock name',
        link: 'http://localhost/mock-slug-1',
      },
      {
        slug: 'mock-slug-2',
        id: 2,
        name: 'Some other mock name',
        link: 'http://localhost/mock-slug-2',
      },
    ];
    const output = shallow(<TwoCards categoriesList={mockCategory} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
