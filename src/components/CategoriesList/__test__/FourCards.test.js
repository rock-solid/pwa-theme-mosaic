import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import FourCards from '../FourCards';

describe('Four cards', () => {
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
      {
        slug: 'mock-slug',
        id: 4,
        name: 'Mock name',
      },
    ];
    const output = shallow(<FourCards categoriesList={mockCategory} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
