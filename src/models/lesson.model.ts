import DateRange from './date-range.model';

export default class Lesson {
  number: number;
  dayOfWeek: string;
  time: DateRange;
  name: string;
  teacher: string;
  group: string;
  room: string;
  type: string;
  note: string;
}
