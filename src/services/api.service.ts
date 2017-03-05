import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import Criterion from '../models/criterion.model';
import Day from '../models/day.model';
import DateRange from '../models/date-range.model';

const API_SERVER = 'https://timetable-api.azurewebsites.net';
const CRITERIA_URL = `${API_SERVER}/criteria`;
const TIMETABLE_URL = `${API_SERVER}/timetable`;

@Injectable()
export class ApiService {

  constructor(private http: Http) {

  }

  getCriteria(typeId: number): Promise<Criterion[]> {
    return this.http
      .get(`${CRITERIA_URL}/${typeId}`)
      .toPromise()
      .then(response => response.json() as Criterion[]);
  }

  getTimetable(criteriaTypeId: number, criterionId: string, dateRange: DateRange): Promise<Day[]> {

    let params = new URLSearchParams();
    params.set('criteriaType', criteriaTypeId.toString());
    params.set('criterion', criterionId);
    params.set('from', dateRange.from);
    params.set('to', dateRange.to);

    return this.http
      .get(TIMETABLE_URL, {search: params})
      .toPromise()
      .then(response => response.json() as Day[]);
  }

}
