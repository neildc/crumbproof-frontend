import _ from "lodash";
import moment from "moment";

export default function generateInstructionTimeline(instructions, startTime) {
  // instructions being passed in is simply a bunch of objects
  const instructionsArr = instructions;

  const timeline = [startTime];

  // Accumulate the time gaps from the starttime
  for (let i = 0; i < instructionsArr.length - 1; i++) {
    // time_gap_to_next is a Nullable field
    if (instructionsArr[i].time_gap_to_next) {
      timeline[i + 1] = moment(timeline[i]).add(
        instructionsArr[i].time_gap_to_next,
        "minutes"
      );
    } else {
      timeline[i + 1] = moment(timeline[i]);
    }
  }

  return _.zipWith(timeline, instructionsArr, (time, instruction) =>
    // Add the dates from the timeline back into the instructions
    Object.assign({}, instruction, { time })
  );
}
