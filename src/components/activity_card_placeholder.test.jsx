import React from 'react';
import { shallow } from 'enzyme';
import ActivityCardPlaceholder from './activity_card_placeholder';

it('renders without throwing', () => {
  const component = shallow(<ActivityCardPlaceholder />);

  expect(component).toMatchSnapshot();
});
