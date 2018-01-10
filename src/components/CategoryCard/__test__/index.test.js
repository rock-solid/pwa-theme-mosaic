import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CategoryCard from '../index';

describe('Category card', () => {
  it('should render correctly', () => {
    const mockCategory = {
      slug: 'mock-slug',
      id: 1,
      name: 'Some mock name',
    };
    const output = shallow(<CategoryCard category={mockCategory} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
