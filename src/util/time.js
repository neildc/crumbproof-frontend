import _ from 'lodash';
import moment from 'moment';

export function getTotalTimeStr(instructions) {
  const sumMinutes = _.sum(_.map(instructions, 'time_gap_to_next'));
  const hours = _.floor(sumMinutes / 60);
  const minutes = sumMinutes % 60;
  return (hours > 0 ? `${hours}h ${minutes} mins` : `${minutes} mins`);
}

export function dateToday() {
  return (moment().format('MMM Do YY'));
}
