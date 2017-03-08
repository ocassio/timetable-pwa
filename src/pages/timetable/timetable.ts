import { Component } from '@angular/core';

import { ToastController } from 'ionic-angular';

import Day from '../../models/day.model';
import CriterionStorageModel from '../../models/criterion.storage.model';

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
    private apiService: ApiService,
    private toastController: ToastController
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

  //TODO: refactor this callback hell
  loadTimetable(): Promise<Day[]> {
    return new Promise((resolve, reject) => {
      this.storageService
      .getCriterion()
      .then(criterionData => {
        this.apiService
          .getTimetable(
            criterionData.typeId,
            criterionData.id,
            { from: '01.03.2017', to: '01.04.2017' }
          )
          .then(timetable => {
            this.timetable = timetable;
            this.storageService.setTimetable(timetable);
            resolve(timetable);
          })
          .catch((reason) => reject(reason));
      });
    })
    .catch(this.showErrorMessage.bind(this));
  }

  showErrorMessage(): void {
    let toast = this.toastController.create({
      message: 'Не удалось загрузить данные',
      duration: 3000
    });
    toast.present();
  }

}
