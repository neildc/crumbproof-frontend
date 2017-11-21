import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './header';

it('renders without throwing', () => {
  global.window = { innerWidth: 1000 };

  const component = shallow(
    <Header />,
  );

  expect(component).toMatchSnapshot();
});
