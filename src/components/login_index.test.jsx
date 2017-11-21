import React from 'react';
import { shallow } from 'enzyme';
import { LoginIndex } from './login_index';

it('renders without throwing', () => {
  const component = shallow(
    <LoginIndex
      error={null}
      handleSubmit={jest.fn()}
      submitting={false}
    />,
  );

  expect(component).toMatchSnapshot();
});
