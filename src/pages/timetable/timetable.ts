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

  async ionViewDidLoad(): Promise<void> {
    const timetable = await this.storageService.getTimetable();
    this.timetable = timetable ? timetable : [];
  }

  ionViewDidEnter(): void {
    this.refresh();
  }

  async refresh() {
    let toast = this.toastController.create({
      message: 'Обновляем данные...'
    });
    toast.present();

    try {
      await this.loadTimetable();
    } catch (e) {
      this.processError(e);
    }

    toast.dismiss();
    this.content.scrollToTop();
  }

  async loadTimetable(): Promise<Day[]> {

    const criterionData = await this.storageService.getCriterion();
    if (!criterionData) {
      throw new Error(CRITERION_MISSING_ERROR);
    }

    const storedDateRange = await this.storageService.getDateRange();
    const dateRange = storedDateRange ? storedDateRange.dateRange : DateUtils.getSevenDays();

    let timetable;
    try {
      timetable = await this.apiService.getTimetable(criterionData.typeId, criterionData.id, dateRange);
    } catch (e) {
      throw new Error(NETWORK_ERROR);
    }

    this.timetable = timetable;
    this.storageService.setTimetable(timetable);

    return timetable;
  }

  processError(error: Error): void {
    switch (error.message) {
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
