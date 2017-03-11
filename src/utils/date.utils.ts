import moment from 'moment';

import DateRange from '../models/date-range.model';

const DATE_FORMAT = 'DD.MM.YYYY';

export class DateUtils {

  static isDate(string: string): boolean {
    return this.toMoment(string).isValid();
  }

  static toString(date: moment.MomentInput): string {
    return moment(date).format(DATE_FORMAT);
  }

  static toMoment(string: string): moment.Moment {
    return moment(string, DATE_FORMAT, true);
  }

  static toIsoString(string: string): string {
    return this.toMoment(string).toISOString();
  }

  static toDate(string: string): Date {
    return this.toMoment(string).toDate();
  }

  static getDayOfWeek(string: string): string {
    let dayOfWeek = this.toMoment(string).format('dddd');
    dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

    return dayOfWeek;
  }

  static getDayOfWeekNumber(string: string): number {
    return this.toMoment(string).day();
  }

  static isToday(string: string): boolean {
    return this.toMoment(string).isSame(new Date(), 'day');
  }

  static isBefore(first: moment.MomentInput, second: moment.MomentInput): boolean {
    let f = typeof first == 'string' ? this.toMoment(first) : moment(first);
    let s = typeof second == 'string' ? this.toMoment(second) : moment(second);

    return f.isBefore(s);
  }

  static isAfter(first: moment.MomentInput, second: moment.MomentInput): boolean {
    let f = typeof first == 'string' ? this.toMoment(first) : moment(first);
    let s = typeof second == 'string' ? this.toMoment(second) : moment(second);

    return f.isAfter(s);
  }

  static getTodayRange(): DateRange {
    let now = moment().format(DATE_FORMAT);
    return {
      from: now,
      to: now
    };
  }

  static getSevenDays(): DateRange {
    let now = moment();
    return {
      from: now.format(DATE_FORMAT),
      to: now.add(6, 'days').format(DATE_FORMAT)
    };
  }

  static getCurrentWeek(): DateRange {
    let now = moment();
    return {
      from: now.startOf('week').format(DATE_FORMAT),
      to: now.endOf('week').format(DATE_FORMAT)
    };
  }

  static getNextWeek(): DateRange {
    let next = moment().add(1, 'week');
    return {
      from: next.startOf('week').format(DATE_FORMAT),
      to: next.endOf('week').format(DATE_FORMAT)
    };
  }

  static getCurrentMonth(): DateRange {
    let now = moment();
    return {
      from: now.startOf('month').format(DATE_FORMAT),
      to: now.endOf('month').format(DATE_FORMAT)
    };
  }

}
