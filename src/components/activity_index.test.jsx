import React from 'react';
import { shallow } from 'enzyme';
import { ActivityIndex } from './activity_index';

it('renders without throwing', () => {
  const component = shallow(
    <ActivityIndex
      activities={activities}
      fetchMoreActiviites={jest.fn()}
      fetchActivities={jest.fn()}
    />,
  );

  expect(component).toMatchSnapshot();
});


it('renders the placeholder', () => {
  const component = shallow(
    <ActivityIndex
      activities={{}}
      fetchMoreActiviites={jest.fn()}
      fetchActivities={jest.fn()}
    />,
  );

  expect(component).toMatchSnapshot();
});

const activities = {
  byId: {
    1: {
      id: 1,
      name: 'Attempt #2: bit more water',
      user: 'neildc',
      recipe: {
        id: 2,
        user: 'neildc',
        data: {
          name: 'It was the only flour they had v2',
          ingredients: [
            {
              quantity: 590,
              id: '9c827860-1aa5-4e00-9eca-9b25ac3c0a8b',
              unit: 'grams',
              name: 'Lauke Wholegrain Breadmix',
            },
            {
              quantity: '380',
              id: 'eb1b8781-68d0-4f17-aef5-cd572488c253',
              unit: 'mL',
              name: 'Water',
            },
            {
              quantity: 3,
              id: 'eab76adf-a6aa-44f0-aba4-bcc1578ba34e',
              unit: 'Teaspoons',
              name: 'Yeast',
            },
          ],
          yield_count: 1,
          yield_type: 'Loaf',
          room_temperature: 22,
          instructions: [
            {
              content: 'Dump all ingredients into the bowl',
              step_number: 1,
              id: '3e62254f-dec3-469a-a914-1fa5f28ad7b1',
              time_gap_to_next: 0,
            },
            {
              content: 'Mix everything together',
              step_number: 2,
              id: '0fae1481-8e36-406d-bdb1-1bd63a1fac39',
              time_gap_to_next: 5,
            },
            {
              content: 'Knead',
              step_number: 3,
              id: 'e7478adf-b000-4b1b-8ee6-9d5608cfc95d',
              time_gap_to_next: 15,
            },
            {
              content: 'Place into a cling wrapped container',
              step_number: 4,
              id: '1cf51cf8-3fb7-47ea-9d5a-9743dbde5068',
            },
            {
              content: 'Proof',
              step_number: 5,
              id: '86a03291-146a-4935-b8d7-b1afcef11924',
              time_gap_to_next: 30,
            },
            {
              content: 'Fold',
              step_number: 6,
              id: '980dbd9c-2ec3-4ef1-a477-fc9e361a2c59',
            },
            {
              content: 'Proof',
              step_number: 7,
              id: '45e1857e-b223-434c-ad8d-137eae4e3d32',
              time_gap_to_next: 30,
            },
            {
              content: 'Fold',
              step_number: 8,
              id: 'f107ac75-7f34-4721-b02b-2a4cc19ee4c7',
              time_gap_to_next: 0,
            },
            {
              content: 'Proof',
              step_number: 9,
              id: '51657483-038f-41d2-ac12-e105c6a99b22',
              time_gap_to_next: 60,
            },
            {
              content: 'Preheat oven and dutch oven',
              step_number: 10,
              id: '0e301924-217c-44ce-ab84-46495ad63d0b',
            },
            {
              content: 'Shape dough',
              step_number: 11,
              id: '1350120b-79c0-4314-a7cc-08fe9b6fbaab',
            },
            {
              content: 'Final proof',
              step_number: 12,
              id: '05c72cff-a836-4e99-a7a7-5163286333f8',
              time_gap_to_next: 25,
            },
            {
              content: 'Sprinkle a bit of water onto the dough',
              id: '92c2d615-cab8-42d7-901b-ffebeeb88d4e',
            },
            {
              content: 'Start baking with lid on',
              step_number: 13,
              id: 'c1c185ab-4859-493f-a292-2464b76cc494',
              time_gap_to_next: 30,
            },
            {
              content: 'Remove lid and continue baking',
              step_number: 14,
              id: '32a3b48b-4d4f-455a-87b4-b5f36444e595',
              time_gap_to_next: 10,
            },
            {
              content: 'Remove from oven and rest',
              step_number: 15,
              id: 'dfb737bb-5291-4e58-8162-a19cfa6d3aa3',
              time_gap_to_next: 10,
            },
            {
              content: 'EAT ALL THE BREAD',
              step_number: 16,
              id: '983d591d-f050-4fb1-8a34-63db202f6c72',
            },
          ],
        },
        diff: {
          instructions: {
            removed: [],
            added: [
              {
                content: 'Sprinkle a bit of water onto the dough',
                id: '92c2d615-cab8-42d7-901b-ffebeeb88d4e',
              },
            ],
            modified: [],
          },
          ingredients: {
            removed: [],
            added: [],
            modified: [
              {
                quantity: '380',
                id: 'eb1b8781-68d0-4f17-aef5-cd572488c253',
                unit: 'mL',
                name: 'Water',
              },
            ],
          },
        },
        base_recipe: 1,
        parent: 1,
        created: '2017-10-31T05:50:44.821819Z',
      },
      started: null,
      created: '2017-10-31T05:50:45.906498Z',
      completed: null,
      oven_start: null,
      oven_end: null,
      crumb_shot: 'https://crumbproof-img.s3.amazonaws.com/media/images/d02376ee-674.jpg',
      notes: 'Got a bit more spring compared to last time.',
    },
    2: {
      id: 2,
      name: 'Attempt #3: A little bit darker',
      user: 'neildc',
      recipe: {
        id: 3,
        user: 'neildc',
        data: {
          name: 'It was the only flour they had v3',
          ingredients: [
            {
              quantity: 590,
              id: '9c827860-1aa5-4e00-9eca-9b25ac3c0a8b',
              unit: 'grams',
              name: 'Lauke Wholegrain Breadmix',
            },
            {
              quantity: '380',
              id: 'eb1b8781-68d0-4f17-aef5-cd572488c253',
              unit: 'mL',
              name: 'Water',
            },
            {
              quantity: 3,
              id: 'eab76adf-a6aa-44f0-aba4-bcc1578ba34e',
              unit: 'Teaspoons',
              name: 'Yeast',
            },
          ],
          yield_count: 1,
          yield_type: 'Loaf',
          room_temperature: 22,
          instructions: [
            {
              content: 'Dump all ingredients into the bowl',
              step_number: 1,
              id: '3e62254f-dec3-469a-a914-1fa5f28ad7b1',
              time_gap_to_next: 0,
            },
            {
              content: 'Mix everything together',
              step_number: 2,
              id: '0fae1481-8e36-406d-bdb1-1bd63a1fac39',
              time_gap_to_next: 5,
            },
            {
              content: 'Knead',
              step_number: 3,
              id: 'e7478adf-b000-4b1b-8ee6-9d5608cfc95d',
              time_gap_to_next: 15,
            },
            {
              content: 'Place into a cling wrapped container',
              step_number: 4,
              id: '1cf51cf8-3fb7-47ea-9d5a-9743dbde5068',
            },
            {
              content: 'Proof',
              step_number: 5,
              id: '86a03291-146a-4935-b8d7-b1afcef11924',
              time_gap_to_next: 30,
            },
            {
              content: 'Fold',
              step_number: 6,
              id: '980dbd9c-2ec3-4ef1-a477-fc9e361a2c59',
            },
            {
              content: 'Proof',
              step_number: 7,
              id: '45e1857e-b223-434c-ad8d-137eae4e3d32',
              time_gap_to_next: 30,
            },
            {
              content: 'Fold',
              step_number: 8,
              id: 'f107ac75-7f34-4721-b02b-2a4cc19ee4c7',
              time_gap_to_next: 0,
            },
            {
              content: 'Proof',
              step_number: 9,
              id: '51657483-038f-41d2-ac12-e105c6a99b22',
              time_gap_to_next: 60,
            },
            {
              content: 'Preheat oven and dutch oven',
              step_number: 10,
              id: '0e301924-217c-44ce-ab84-46495ad63d0b',
            },
            {
              content: 'Shape dough',
              step_number: 11,
              id: '1350120b-79c0-4314-a7cc-08fe9b6fbaab',
            },
            {
              content: 'Final proof',
              step_number: 12,
              id: '05c72cff-a836-4e99-a7a7-5163286333f8',
              time_gap_to_next: 25,
            },
            {
              content: 'Sprinkle a bit of water onto the dough',
              id: '92c2d615-cab8-42d7-901b-ffebeeb88d4e',
            },
            {
              content: 'Start baking with lid on at the bottom rack of the oven',
              step_number: 13,
              id: 'c1c185ab-4859-493f-a292-2464b76cc494',
              time_gap_to_next: 30,
            },
            {
              content: 'Remove lid and continue baking',
              step_number: 14,
              id: '32a3b48b-4d4f-455a-87b4-b5f36444e595',
              time_gap_to_next: '15',
            },
            {
              content: 'Remove from oven and rest',
              step_number: 15,
              id: 'dfb737bb-5291-4e58-8162-a19cfa6d3aa3',
              time_gap_to_next: 10,
            },
            {
              content: 'EAT ALL THE BREAD',
              step_number: 16,
              id: '983d591d-f050-4fb1-8a34-63db202f6c72',
            },
          ],
        },
        diff: {
          instructions: {
            removed: [],
            added: [],
            modified: [
              {
                content: 'Start baking with lid on at the bottom rack of the oven',
                step_number: 13,
                id: 'c1c185ab-4859-493f-a292-2464b76cc494',
                time_gap_to_next: 30,
              },
              {
                content: 'Remove lid and continue baking',
                step_number: 14,
                id: '32a3b48b-4d4f-455a-87b4-b5f36444e595',
                time_gap_to_next: '15',
              },
            ],
          },
          ingredients: null,
        },
        base_recipe: 1,
        parent: 2,
        created: '2017-10-31T05:54:00.788891Z',
      },
      started: null,
      created: '2017-10-31T05:54:01.860275Z',
      completed: null,
      oven_start: null,
      oven_end: null,
      crumb_shot: 'https://crumbproof-img.s3.amazonaws.com/media/images/1277d83f-c40.jpg',
      notes: 'Playing around with a bit more time in the oven.',
    },
    11: {
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
          room_temperature: 22,
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
    },
    112: {
      id: 112,
      name: 'My first attempt at fougasse.',
      user: 'breadit',
      recipe: null,
      started: null,
      created: '2017-10-24T21:52:53.668529Z',
      completed: null,
      oven_start: null,
      oven_end: null,
      crumb_shot: 'https://crumbproof-img.s3.amazonaws.com/media/images/ff7b998f-505.jpg',
      notes: 'https://redd.it/6w7n1o',
    },
    113: {
      id: 113,
      name: 'Garlic Cheddar knots - irregular but delicious',
      user: 'breadit',
      recipe: null,
      started: null,
      created: '2017-10-24T21:52:58.268940Z',
      completed: null,
      oven_start: null,
      oven_end: null,
      crumb_shot: 'https://crumbproof-img.s3.amazonaws.com/media/images/937ac3f5-62a.jpg',
      notes: 'https://redd.it/6uixc2',
    },
    114: {
      id: 114,
      name: 'The hills of focaccia.',
      user: 'breadit',
      recipe: null,
      started: null,
      created: '2017-10-24T21:53:02.235143Z',
      completed: null,
      oven_start: null,
      oven_end: null,
      crumb_shot: 'https://crumbproof-img.s3.amazonaws.com/media/images/6a478109-563.jpg',
      notes: 'https://redd.it/5wh0v8',
    },
    115: {
      id: 115,
      name: 'That Sunday morning bake',
      user: 'breadit',
      recipe: null,
      started: null,
      created: '2017-10-24T21:53:06.759565Z',
      completed: null,
      oven_start: null,
      oven_end: null,
      crumb_shot: 'https://crumbproof-img.s3.amazonaws.com/media/images/4b1d4050-4bf.jpg',
      notes: 'https://redd.it/67jz9f',
    },
    116: {
      id: 116,
      name: 'Blew my lid with this 360 degree ear.',
      user: 'breadit',
      recipe: null,
      started: null,
      created: '2017-10-24T21:53:12.464319Z',
      completed: null,
      oven_start: null,
      oven_end: null,
      crumb_shot: 'https://crumbproof-img.s3.amazonaws.com/media/images/3008eaa1-5da.jpg',
      notes: 'https://redd.it/74p85c',
    },
    117: {
      id: 117,
      name: 'Proof tight sweet prince',
      user: 'breadit',
      recipe: null,
      started: null,
      created: '2017-10-24T21:53:17.154140Z',
      completed: null,
      oven_start: null,
      oven_end: null,
      crumb_shot: 'https://crumbproof-img.s3.amazonaws.com/media/images/e3722eea-116.jpg',
      notes: 'https://redd.it/6w0gl7',
    },
    118: {
      id: 118,
      name: '80% White, 20% Spelt Sourdough at 76% hydro',
      user: 'breadit',
      recipe: null,
      started: null,
      created: '2017-10-24T21:53:19.910185Z',
      completed: null,
      oven_start: null,
      oven_end: null,
      crumb_shot: 'https://crumbproof-img.s3.amazonaws.com/media/images/4d7ff2db-f7b.jpg',
      notes: 'https://redd.it/64kimp',
    },
  },
  next: 'https://flour.crumbproof.com/activities/?page=2',
};
