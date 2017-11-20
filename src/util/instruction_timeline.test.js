import generateInstructionTimeline from './instruction_timeline';

const instructions = [
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
];


it('generates a correct timeline', () => {
  const TIME = '2017-11-20T08:11:41.868Z';

  expect(generateInstructionTimeline(instructions, TIME)).toMatchSnapshot();
});
