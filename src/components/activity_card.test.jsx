import React from 'react';
import { shallow } from 'enzyme';
import { ActivityCard } from './activity_card';
import { simpleActivity } from '../stubs/activity';

it('renders without throwing', () => {
  const component = shallow(
    <ActivityCard
      activity={simpleActivity}
      user="test"
    />,
  );

  expect(component).toMatchSnapshot();
});
