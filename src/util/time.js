import _ from "lodash";

export function getTotalTimeStr(instructions) {
  let sumMinutes = _.sum(_.map(instructions, "time_gap_to_next"));
  let hours = _.floor(sumMinutes/60);
  let minutes = sumMinutes % 60;
  return (hours > 0 ? `${hours}h ${minutes} mins`:`${minutes} mins`);
}
