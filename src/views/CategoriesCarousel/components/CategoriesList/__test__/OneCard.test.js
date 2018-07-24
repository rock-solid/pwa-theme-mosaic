import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import OneCard from '../OneCard';

describe('One card', () => {
  it('should render correctly', () => {
    const mockCategory = [
      {
        slug: 'mock-slug-1',
        id: 1,
        name: 'Some mock name',
        link: 'http://localhost/mock-slug-1',
      },
    ];
    const output = shallow(<OneCard categoriesList={mockCategory} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
