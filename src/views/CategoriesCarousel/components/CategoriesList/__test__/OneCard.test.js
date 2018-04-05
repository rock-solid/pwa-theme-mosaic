import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import OneCard from '../OneCard';

describe('One card', () => {
  it('should render correctly', () => {
    const mockCategory = [
      {
        slug: 'mock-slug',
        id: 1,
        name: 'Some mock name',
      },
    ];
    const output = shallow(<OneCard categoriesList={mockCategory} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
