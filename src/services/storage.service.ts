import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import Day from '../models/day.model';
import DateRange from '../models/date-range.model';

const TIMETABLE_KEY = 'timetable';
const CRITERION_KEY = 'criterion';
const DATE_RANGE_KEY = 'dateRange';

export type CriterionStorageModel = {
  typeId: number;
  id: string;
};

export type DateRangeStorageModel = {
  type: string;
  dateRange: DateRange
};

@Injectable()
export class StorageService {

  constructor(private storage: Storage) {

  }

  setTimetable(timetable: Day[]): void {
    this.storage.set(TIMETABLE_KEY, timetable);
  }

  getTimetable(): Promise<Day[]> {
    return this.storage.get(TIMETABLE_KEY).then(timetable => timetable as Day[]);
  }

  setCriterion(criterion: CriterionStorageModel): void {
    this.storage.set(CRITERION_KEY, criterion);
  }

  getCriterion(): Promise<CriterionStorageModel> {
    return this.storage.get(CRITERION_KEY).then(criterion => criterion as CriterionStorageModel);
  }

  setDateRange(dateRange: DateRangeStorageModel): void {
    this.storage.set(DATE_RANGE_KEY, dateRange);
  }

  getDateRange(): Promise<DateRangeStorageModel> {
    return this.storage.get(DATE_RANGE_KEY).then(dateRange => dateRange as DateRangeStorageModel);
  }

}
