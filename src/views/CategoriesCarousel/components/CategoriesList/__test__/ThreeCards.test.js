import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ThreeCards from '../ThreeCards';

describe('Three cards', () => {
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
      {
        slug: 'mock-slug-3',
        id: 3,
        name: 'Some name',
        link: 'http://localhost/mock-slug-3',
      },
    ];
    const output = shallow(<ThreeCards categoriesList={mockCategory} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
