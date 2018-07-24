import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Footer from '../index';

describe('Footer', () => {
  it('should render correctly', () => {
    const output = shallow(<Footer />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render correctly with title and page', () => {
    const output = shallow(<Footer title="Footer title" page={2} pageLabel="Page" />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
