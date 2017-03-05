import TimeRange from './time-range.model';

export default class Lesson {
  number: number;
  dayOfWeek: string;
  time: TimeRange;
  name: string;
  teacher: string;
  group: string;
  room: string;
  type: string;
  note: string;
}
