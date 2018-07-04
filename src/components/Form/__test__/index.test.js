import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Form from '../index';

describe('Comment form', () => {
  it('should render correctly', () => {
    const mockHandleSubmit = jest.fn();
    const output = shallow(<Form onSubmit={mockHandleSubmit} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  // @todo Fix test
  /*
  it('submit works', () => {
    const testValues = {
      author_name: 'Name',
      email: 'email@mail',
      content: {
        rendered: 'Comment content',
      },
      date: new Date(),
      post: '53',
      handleSubmit: jest.fn(),
    };
    const component = shallow(<Form {...testValues} />);
    component.debug();
    component.find('#submit').simulate('click');
    expect(testValues.handleSubmit).toHaveBeenCalledTimes(1);
    expect(testValues.handleSubmit).toBeCalledWith({
      author_name: testValues.author_name,
      email: testValues.email,
      content: {
        rendered: testValues.content.rendered,
      },
      date: testValues.date,
      post: testValues.post,
      handleSubmit: testValues.handleSubmit,
    });
  });
  */
});
