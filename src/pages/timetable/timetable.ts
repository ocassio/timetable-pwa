import { Component } from '@angular/core';

import {  } from '@ionic';

import Day from '../../models/day.model';

import { CriteriaPage } from '../criteria/criteria';
import { DatePage } from '../date/date';

import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'page-timetable',
  templateUrl: 'timetable.html'
})
export class TimetablePage {

  criteriaPage = CriteriaPage;
  datePage = DatePage;

  timetable: Day[] = [];

  constructor(
    private storageService: StorageService,
    private apiService: ApiService
  ) { }

  ionViewDidLoad(): void {
    this.storageService
      .getTimetable()
      .then(timetable => this.timetable = timetable ? timetable : []);
  }

  ionViewDidEnter(): void {
    this.loadTimetable();
  }

  refresh(refresher) {
    this.loadTimetable().then(() => refresher.complete());
  }

  loadTimetable(): Promise<void> {
    return this.apiService
      .getTimetable(0, '739', { from: '01.03.2017', to: '01.04.2017' })
      .then(this.processTimetable.bind(this));
  }

  processTimetable(timetable: Day[]): void {
    this.timetable = timetable;
    this.storageService.setTimetable(timetable);
  }

}
