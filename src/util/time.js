import _ from 'lodash';
import moment from 'moment';

export function minToHandM(minutes) {
  const hours = _.floor(minutes / 60);
  const minutesRemainder = minutes % 60;

  return { hours, minutes: minutesRemainder };
}

export function getTotalTimeStr(instructions) {
  const sumMinutes = _.sum(_.map(instructions, 'time_gap_to_next'));
  const { hours, minutes } = minToHandM(sumMinutes);

  if (!hours && !minutes) {
    return null;
  }

  return (hours > 0 ? `${hours}h ${minutes} mins` : `${minutes} mins`);
}

export function dateToday() {
  return (moment().format('MMM Do YY'));
}
