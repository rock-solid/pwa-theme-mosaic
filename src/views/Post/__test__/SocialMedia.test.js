import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SocialMedia from '../components/SocialMedia';

describe('Social media component', () => {
  const title = 'mock-title';
  const link = 'mock-link';

  it('should render correctly', () => {
    const output = shallow(<SocialMedia title={title} link={link} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
