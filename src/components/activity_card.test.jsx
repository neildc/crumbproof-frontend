import React from 'react';
import { shallow } from 'enzyme';
import { ActivityCard } from './activity_card';

it('renders without throwing', () => {
  const component = shallow(
    <ActivityCard
      activity={activity}
      user="test"
    />,
  );

  expect(component).toMatchSnapshot();
});

const activity = {
  id: 11,
  name: 'Saturday wholewheat but on a Thursday (first attempt)',
  user: 'neildc',
  recipe: {
    id: 5,
    user: 'neildc',
    data: {
      name: 'The Saturday 75% Whole Wheat Bread',
      ingredients: [
        {
          quantity: 750,
          id: 'eced125b-b723-445e-bc0b-80e361afac89',
          unit: 'g',
          name: 'Whole wheat flour',
        },
        {
          quantity: 250,
          id: '917f91af-9f47-4013-a885-286e7f970fbd',
          unit: 'g',
          name: 'White flour',
        },
        {
          quantity: 800,
          id: '7d357b9c-6459-4b54-a9eb-47767219ca9c',
          unit: 'mL',
          name: 'Water (32ºC - 35ºC)',
        },
        {
          quantity: 22,
          id: 'a1e88f44-5e81-42a6-8705-bc79b0349d19',
          unit: 'g',
          name: 'Fine sea salt',
        },
        {
          quantity: 3,
          id: '822a69a9-f26c-4ecb-ab67-8957ea32d16a',
          unit: 'g',
          name: 'Instant dried yeast',
        },
      ],
      yield_count: 2,
      credits: 'Flour water salt yeast by Ken Forkish',
      yield_type: 'Loaves',
      bake_time: 50,
      oven_temperature: 245,
      instructions: [
        {
          content: 'Mix the all the flour and water',
          id: '08bde909-e991-4297-9d3f-366c07f0db5d',
        },
        {
          content: 'Cover and rest (up to 30 minutes)',
          id: 'd056221d-2403-4e1e-af6b-2047dc20fa2b',
          time_gap_to_next: 20,
        },
        {
          content: 'Add salt and yeast',
          id: '1cae6ce9-2fd8-43ac-99b7-d5f67033ff00',
        },
        {
          content: 'Mix',
          id: '66f04260-a700-4aa1-80ef-6261f483cd62',
        },
        {
          content: 'Cut (pincer) and fold',
          id: 'a7daf818-0ad3-4ffa-8cae-be0da68c2e34',
        },
        {
          content: 'Micro rest',
          id: '8576e944-9878-4c2f-9dd4-950a7009fdf7',
          time_gap_to_next: 5,
        },
        {
          content: 'Cut and fold a tiny bit more',
          id: 'f9e192a6-4dd8-41c1-a41e-cb34d3672af5',
          time_gap_to_next: 1,
        },
        {
          content: 'Cover tub, rest',
          id: '84db3794-288e-48c8-8c4d-e533b908a12a',
          time_gap_to_next: 10,
        },
        {
          content: '3x Fold gently and rest (or until dough is spread out)',
          id: 'af928e57-8e00-478f-8825-63ba35aaa6e6',
          time_gap_to_next: 60,
        },
        {
          content: 'Cover tub, rest',
          id: 'b39ac47b-01de-452e-8ce9-5f105ec36431',
          time_gap_to_next: 240,
        },
        {
          content: 'Split into 2  and shape',
          id: 'f340ed79-2939-41a0-bae4-49a6b38287f2',
        },
        {
          content: 'Lightly flour top and cover with tea towel (assuming room temp ~21°C, otherwise 60 mins if warmer)',
          id: '5b3090b8-e6c4-4846-b08f-ab177348d2cb',
          time_gap_to_next: 55,
        },
        {
          content: 'Preheat oven with dutch oven',
          id: '5737588d-1016-4332-a865-abc1e109c827',
        },
        {
          content: 'Place a single loaf into the fridge, continue proofing other',
          id: '4269f5b7-7cff-4178-a929-41357a866c1f',
          time_gap_to_next: 20,
        },
        {
          content: 'Start baking (seam side up) with the lid on',
          id: '38482248-3202-4539-9901-880a0ae3c1fd',
          time_gap_to_next: 30,
        },
        {
          content: 'Remove lid and continue baking (or until medium dark brown)',
          id: '17c6a1e3-a9a6-4db0-b3ad-e01beb82f3ff',
          time_gap_to_next: 20,
        },
        {
          content: 'Remove from oven and rest',
          id: '6d82d310-50a3-4fbb-90be-8fa418c476bf',
          time_gap_to_next: 20,
        },
        {
          content: 'EAT ALL THE BREAD',
          id: 'c7f6dc4b-804e-4c57-bf5c-74cb4865916f',
        },
      ],
    },
    diff: null,
    base_recipe: null,
    parent: null,
    created: '2017-10-31T22:18:58.628723Z',
  },
  started: null,
  created: '2017-11-09T03:23:13.595165Z',
  completed: null,
  oven_start: null,
  oven_end: null,
  crumb_shot: 'https://crumbproof-img.s3.amazonaws.com/media/images/8fa50806-f37.jpg',
  notes: "Boule didn't hold much tension after the final proof. Decent crumb but crust wasn't crunchy.\n\nMaybe less water next time.",
};
