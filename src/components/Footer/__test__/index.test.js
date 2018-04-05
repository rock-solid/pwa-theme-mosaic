import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Footer from '../index';

describe('Footer', () => {
  it('should render correctly', () => {
    const output = shallow(<Footer />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
