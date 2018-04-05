import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import FiveCards from '../FiveCards';

describe('Five cards', () => {
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
      {
        slug: 'mock-slug',
        id: 5,
        name: 'Some other other mock name',
      },
    ];
    const output = shallow(<FiveCards categoriesList={mockCategory} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
