import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ThreeCards from '../ThreeCards';

describe('Three cards', () => {
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
      {
        slug: 'mock-slug',
        id: 3,
        name: 'Some name',
      },
    ];
    const output = shallow(<ThreeCards categoriesList={mockCategory} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
