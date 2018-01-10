import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TwoCards from '../TwoCards';

describe('Two cards', () => {
  it('should render correctly', () => {
    const mockCategory = [
      {
        slug: 'mock-slug',
        id: 1,
        name: 'Some mock name',
      },
      {
        slug: 'mock-slug',
        id: 2,
        name: 'Some other mock name',
      },
    ];
    const output = shallow(<TwoCards categoriesList={mockCategory} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
