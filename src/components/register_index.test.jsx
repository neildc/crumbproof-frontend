import React from 'react';
import { shallow } from 'enzyme';
import { RegisterIndex } from './register_index';

it('renders without throwing', () => {
  const component = shallow(
    <RegisterIndex
      error={null}
      handleSubmit={jest.fn()}
      submitting={false}
    />,
  );

  expect(component).toMatchSnapshot();
});
