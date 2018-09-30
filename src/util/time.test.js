import * as time from "./time";

it("converts minutes < 60 to minutes & hours", () => {
  expect(time.minToHandM(30)).toMatchSnapshot();
});

it("converts minutes > 60 to minutes & hours", () => {
  expect(time.minToHandM(320)).toMatchSnapshot();
});

it("null total time string (no instructions)", () => {
  const instructions = [];
  expect(time.getTotalTimeStr(instructions)).toMatchSnapshot();
});

it("null total time string (1 instruction, no time)", () => {
  const instruction = [{ content: "Mix the all the flour and water", id: "1" }];
  expect(time.getTotalTimeStr(instruction)).toMatchSnapshot();
});

it("generates a total time string (1 instruction, with time)", () => {
  const instruction = [
    {
      content: "Mix the all the flour and water",
      id: "1",
      time_gap_to_next: 30
    }
  ];
  expect(time.getTotalTimeStr(instruction)).toMatchSnapshot();
});

it("generates a total time string (multiple instructions)", () => {
  const instructions = [
    { content: "Mix the all the flour and water", id: "1" },
    {
      content: "Cover and rest (up to 30 minutes)",
      id: "2",
      time_gap_to_next: 20
    },
    { content: "Add salt and yeast", id: "3" },
    { content: "Mix", id: "4" },
    { content: "Mix the all the flour and water", id: "5" },
    { content: "Micro rest", id: "6", time_gap_to_next: 5 },
    { content: "Cut and fold a tiny bit more", id: "6", time_gap_to_next: 1 },
    { content: "Cover tub, rest", id: "7", time_gap_to_next: 240 }
  ];

  expect(time.getTotalTimeStr(instructions)).toMatchSnapshot();
});
