import { Component, ViewChild } from '@angular/core';

import { NavController, ToastController, Content } from 'ionic-angular';

import Day from '../../models/day.model';

import { CriteriaPage } from '../criteria/criteria';
import { DatePage } from '../date/date';

import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

import { DateUtils } from '../../utils/date.utils';

const NETWORK_ERROR = 'networkError';
const CRITERION_MISSING_ERROR = 'criterionMissingError';

@Component({
  selector: 'page-timetable',
  templateUrl: 'timetable.html'
})
export class TimetablePage {

  criteriaPage = CriteriaPage;
  datePage = DatePage;

  timetable: Day[] = [];

  @ViewChild(Content)
  content: Content;

  constructor(
    private storageService: StorageService,
    private apiService: ApiService,
    private navController: NavController,
    private toastController: ToastController
  ) { }

  ionViewDidLoad(): void {
    this.storageService
      .getTimetable()
      .then(timetable => this.timetable = timetable ? timetable : []);
  }

  ionViewDidEnter(): void {
    this.refresh();
  }

  refresh() {
    let toast = this.toastController.create({
      message: 'Обновляем данные...'
    });
    toast.present();
    this.loadTimetable().then(() => {
      toast.dismiss();
      this.content.scrollToTop();
    });
  }

  //TODO: refactor this callback hell
  loadTimetable(): Promise<Day[]> {
    return new Promise((resolve, reject) => {
      this.storageService
      .getCriterion()
      .then(criterionData => {

        if (!criterionData) {
          reject(CRITERION_MISSING_ERROR);
          return;
        }

        this.storageService
          .getDateRange()
          .then(storedDateRange => {
            let dateRange = storedDateRange ? storedDateRange.dateRange : DateUtils.getSevenDays();

            this.apiService
              .getTimetable(criterionData.typeId, criterionData.id, dateRange)
              .then(timetable => {
                this.timetable = timetable;
                this.storageService.setTimetable(timetable);
                resolve(timetable);
              })
              .catch(() => reject(NETWORK_ERROR));
          });
      });
    })
    .catch(this.processError.bind(this));
  }

  processError(error): void {
    switch (error) {
      case CRITERION_MISSING_ERROR:
        this.navController.push(this.criteriaPage);
        break;

      case NETWORK_ERROR:
        this.showMessage('Не удалось загрузить данные');
        break;

      default:
        this.showMessage('Непредвиденная ошибка');
        break;
    }
  }

  showMessage(message: string): void {
    let toast = this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  isToday(date: string) {
    return DateUtils.isToday(date);
  }

  withPlaceholder(string: string): string {
    return string ? string : '-';
  }

}
