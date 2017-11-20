import {
  INSTRUCTIONS,
  INGREDIENTS,
  generateDiff,
  insertAllRemovedItemsIntoCurrent
} from './diff';

it ('returns null when diffing two equal instructions', () => {
  const instructions = [
    { content: 'Mix the all the flour and water', id: '1'},
    { content: 'Add salt and yeast', id: '2'},
  ];

  expect(generateDiff(INSTRUCTIONS, instructions, instructions)).toBeNull();
});

it ('correct diff after removing an instruction', () => {
  const instructionsA = [
    { content: 'REMOVED', id: '1' },
    { content: 'Add salt and yeast', id: '2'},
  ];

  const instructionsB = [
    { content: 'Add salt and yeast', id: '2' },
  ];

  expect(generateDiff(INSTRUCTIONS, instructionsA, instructionsB)).toMatchSnapshot();
});

it ('correct diff after adding an instruction', () => {
  const instructionsA = [
    { content: 'Add salt and yeast', id: '2' },
  ];
  const instructionsB = [
    { content: 'ADDED', id: '1' },
    { content: 'Add salt and yeast', id: '2' },
  ];


  expect(generateDiff(INSTRUCTIONS, instructionsA, instructionsB)).toMatchSnapshot();
});

it ('correct diff after modifying an instruction', () => {
  const instructionsA = [
    { content: 'Mix the all the flour and water', id: '1'},
    { content: 'Add salt and yeast', id: '2' },
  ];
  const instructionsB = [
    { content: 'MODIFIED', id: '1'},
    { content: 'Add salt and yeast', id: '2' },
  ];

  expect(generateDiff(INSTRUCTIONS, instructionsA, instructionsB)).toMatchSnapshot();
});

it ('correct diff after modifying, removing and adding instructions', () => {
  const instructionsA = [
    { content: 'Mix the all the flour and water', id: '1'},
    { content: 'REMOVED', id: '2' },
  ];
  const instructionsB = [
    { content: 'MODIFIED', id: '1'},
    { content: 'ADDED', id: '3' },
  ];

  expect(generateDiff(INSTRUCTIONS, instructionsA, instructionsB)).toMatchSnapshot();
});

const originalInstructions = [
  { content: '1', id: '1' },
  { content: '2', id: '2' },
  { content: '3', id: '3' },
  { content: '4', id: '4' },
  { content: '5', id: '5' },
  { content: '6', id: '6' },
  { content: '7', id: '7' },
];

it ('inserts removed element in correct position (first)', () => {
  const removed = [{ content: '1', id: '1'}];

  const removedInstruction4 = [
    { content: '2', id: '2' },
    { content: '3', id: '3' },
    { content: '4', id: '4' },
    { content: '5', id: '5' },
    { content: '6', id: '6' },
    { content: '7', id: '7' },
  ];

  const result = insertAllRemovedItemsIntoCurrent(
    removed,
    originalInstructions,
    removedInstruction4,
  );

  expect(result).toMatchSnapshot();
});

it ('inserts removed element in correct position (last)', () => {
  const removed = [{ content: '7', id: '7'}];

  const removedInstruction4 = [
    { content: '1', id: '1' },
    { content: '2', id: '2' },
    { content: '3', id: '3' },
    { content: '4', id: '4' },
    { content: '5', id: '5' },
    { content: '6', id: '6' },
  ];

  const result = insertAllRemovedItemsIntoCurrent(
    removed,
    originalInstructions,
    removedInstruction4,
  );

  expect(result).toMatchSnapshot();
});

it ('inserts removed element in correct position (middle)', () => {
  const removed = [{ content: '4', id: '4'}];

  const removedInstruction4 = [
    { content: '1', id: '1' },
    { content: '2', id: '2' },
    { content: '3', id: '3' },
    { content: '5', id: '5' },
    { content: '6', id: '6' },
    { content: '7', id: '7' },
  ];

  const result = insertAllRemovedItemsIntoCurrent(
    removed,
    originalInstructions,
    removedInstruction4,
  );

  expect(result).toMatchSnapshot();
});

it ('inserts removed element in correct position (middle & multiple together)', () => {
  const removed = [
    { content: '4', id: '4' },
    { content: '5', id: '5' },
  ];

  const afterRemoving = [
    { content: '1', id: '1' },
    { content: '2', id: '2' },
    { content: '3', id: '3' },
    { content: '6', id: '6' },
    { content: '7', id: '7' },
  ];

  const result = insertAllRemovedItemsIntoCurrent(
    removed,
    originalInstructions,
    afterRemoving,
  );

  expect(result).toMatchSnapshot();
});

it ('inserts removed element in correct position (middle & multiple split)', () => {
  const removed = [
    { content: '4', id: '4' },
    { content: '6', id: '6' },
  ];

  const afterRemoving = [
    { content: '1', id: '1' },
    { content: '2', id: '2' },
    { content: '3', id: '3' },
    { content: '5', id: '5' },
    { content: '7', id: '7' },
  ];

  const result = insertAllRemovedItemsIntoCurrent(
    removed,
    originalInstructions,
    afterRemoving,
  );

  expect(result).toMatchSnapshot();
});


// ingredients: [
//   {
//     quantity: 750,
//     id: 'eced125b-b723-445e-bc0b-80e361afac89',
//     unit: 'g',
//     name: 'Whole wheat flour'
//   },
//   {
//     quantity: 250,
//     id: '917f91af-9f47-4013-a885-286e7f970fbd',
//     unit: 'g',
//     name: 'White flour'
//   },
//   {
//     quantity: 800,
//     id: '7d357b9c-6459-4b54-a9eb-47767219ca9c',
//     unit: 'mL',
//     name: 'Water (32ºC - 35ºC)'
//   },
//   {
//     quantity: 22,
//     id: 'a1e88f44-5e81-42a6-8705-bc79b0349d19',
//     unit: 'g',
//     name: 'Fine sea salt'
//   },
//   {
//     quantity: 3,
//     id: '822a69a9-f26c-4ecb-ab67-8957ea32d16a',
//     unit: 'g',
//     name: 'Instant dried yeast'
//   }
// ],
