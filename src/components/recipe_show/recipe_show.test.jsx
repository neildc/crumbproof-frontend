import React from 'react';
import { shallow } from 'enzyme';
import RecipeShowPresentation from './recipe_show';

it('renders with user logged in that created recipe', () => {
  const component = shallow(
    <RecipeShowPresentation
      user={recipe.user}
      recipe={recipe}
      parentRecipe={parentRecipe}
      baseRecipe={baseRecipe}
      onDeleteClick={jest.fn()}
      onRecordActivityClick={jest.fn()}
      onStartActivityClick={jest.fn()}
    />,
  );

  expect(component).toMatchSnapshot();
});

it('renders with user logged in (not recipe owner)', () => {
  const component = shallow(
    <RecipeShowPresentation
      user={'other'}
      recipe={recipe}
      parentRecipe={parentRecipe}
      baseRecipe={baseRecipe}
      onDeleteClick={jest.fn()}
      onRecordActivityClick={jest.fn()}
      onStartActivityClick={jest.fn()}
    />,
  );

  expect(component).toMatchSnapshot();
});

it('renders with no user logged in', () => {
  const component = shallow(
    <RecipeShowPresentation
      user={null}
      recipe={recipe}
      parentRecipe={parentRecipe}
      baseRecipe={baseRecipe}
      onDeleteClick={jest.fn()}
      onRecordActivityClick={jest.fn()}
      onStartActivityClick={jest.fn()}
    />,
  );

  expect(component).toMatchSnapshot();
});

const recipe = {
  id: 30,
  user: 'neildc',
  data: {
    name: 'It was the only flour they had v3 (Nov 21st 17)',
    ingredients: [
      {
        quantity: 590,
        id: '9c827860-1aa5-4e00-9eca-9b25ac3c0a8b',
        unit: 'grams',
        name: 'Lauke Wholegrain Breadmix',
      },
      {
        quantity: '5',
        id: 'eab76adf-a6aa-44f0-aba4-bcc1578ba34e',
        unit: 'Teaspoons',
        name: 'WAS MODIFIED (quantity was 3)',
      },
      {
        quantity: '2',
        id: '576c31a5-29e7-4c33-90b0-4e1f8bcc616c',
        unit: 'kg',
        name: 'This was added, water was removed',
      },
    ],
    yield_count: 1,
    yield_type: 'Loaf',
    bake_time: 40,
    oven_temperature: 250,
    instructions: [
      {
        content: 'Dump all ingredients into the bowl',
        step_number: 1,
        id: '3e62254f-dec3-469a-a914-1fa5f28ad7b1',
        time_gap_to_next: 0,
      },
      {
        content: 'CHANGED THIS ONE',
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
        content: '1st INSERT AFTER 7',
        id: '4210336c-02be-417c-933c-15ed0853ffba',
        time_gap_to_next: '',
      },
      {
        content: '2nd INSERT AFTER 7',
        id: '9fc0f49b-ae3b-4cb2-b978-4e87a2257509',
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
        content: 'Removed previous last step (EAT ALL)',
        id: '87ec0203-8659-4536-83dc-bda438dbcd9d',
      },
    ],
  },
  diff: {
    instructions: {
      removed: [
        {
          content: 'EAT ALL THE BREAD',
          step_number: 16,
          id: '983d591d-f050-4fb1-8a34-63db202f6c72',
        },
      ],
      added: [
        {
          content: '1st INSERT AFTER 7',
          id: '4210336c-02be-417c-933c-15ed0853ffba',
          time_gap_to_next: '',
        },
        {
          content: '2nd INSERT AFTER 7',
          id: '9fc0f49b-ae3b-4cb2-b978-4e87a2257509',
        },
        {
          content: 'Removed previous last step (EAT ALL)',
          id: '87ec0203-8659-4536-83dc-bda438dbcd9d',
        },
      ],
      modified: [
        {
          content: 'CHANGED THIS ONE',
          step_number: 2,
          id: '0fae1481-8e36-406d-bdb1-1bd63a1fac39',
          time_gap_to_next: 5,
        },
      ],
    },
    ingredients: {
      removed: [
        {
          quantity: '380',
          id: 'eb1b8781-68d0-4f17-aef5-cd572488c253',
          unit: 'mL',
          name: 'Water',
        },
      ],
      added: [
        {
          quantity: '2',
          id: '576c31a5-29e7-4c33-90b0-4e1f8bcc616c',
          unit: 'kg',
          name: 'This was added, water was removed',
        },
      ],
      modified: [
        {
          quantity: '5',
          id: 'eab76adf-a6aa-44f0-aba4-bcc1578ba34e',
          unit: 'Teaspoons',
          name: 'WAS MODIFIED (quantity was 3)',
        },
      ],
    },
  },
  base_recipe: 1,
  parent: 3,
  created: '2017-11-21T03:07:01.409623Z',
};

const parentRecipe = {
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
    bake_time: 40,
    oven_temperature: 250,
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
  PARENT: 2,
  CREATED: '2017-10-31T05:54:00.788891Z',
};

const baseRecipe = {
  id: 1,
  user: 'neildc',
  data: {
    name: 'It was the only flour they had',
    ingredients: [
      {
        quantity: 590,
        id: '9c827860-1aa5-4e00-9eca-9b25ac3c0a8b',
        unit: 'grams',
        name: 'Lauke Wholegrain Breadmix',
      },
      {
        quantity: 360,
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
    bake_time: 40,
    oven_temperature: 250,
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
  diff: null,
  base_recipe: null,
  parent: null,
  created: '2017-10-31T05:38:40.643444Z',
};
