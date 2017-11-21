import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './header';

it('renders without throwing', () => {
  const component = shallow(
    <Header />,
  );

  expect(component).toMatchSnapshot();
});
