import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import NotFound from '../index';

describe('Not found component', () => {
  it('should render correctly', () => {
    const output = shallow(<NotFound />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
