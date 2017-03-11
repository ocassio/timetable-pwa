import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import DateRange from '../../models/date-range.model';

import { StorageService } from '../../services/storage.service';

import { DateUtils } from '../../utils/date.utils';


@Component({
  selector: 'page-list',
  templateUrl: 'date.html'
})
export class DatePage {

  dateRangeType: string;

  private customDateRange: DateRange;

  get customFromDate(): string {
    return DateUtils.toIsoString(this.customDateRange.from);
  }

  set customFromDate(from: string) {
    this.customDateRange.from = DateUtils.toString(from);
    if (DateUtils.isAfter(this.customDateRange.from, this.customDateRange.to)) {
      this.customDateRange.to = this.customDateRange.from;
    }
  }

  get customToDate(): string {
    return DateUtils.toIsoString(this.customDateRange.to);
  }

  set customToDate(to: string) {
    this.customDateRange.to = DateUtils.toString(to);
    if (DateUtils.isBefore(this.customDateRange.to, this.customDateRange.from)) {
      this.customDateRange.from = this.customDateRange.to;
    }
  }

  constructor(
    private storageService: StorageService
  ) { }

  ionViewDidLoad(): void {
    this.storageService.getDateRange().then(storedDateRange => {
      if (storedDateRange) {
        this.dateRangeType = storedDateRange.type;
        this.customDateRange = storedDateRange.dateRange;
      } else {
        this.dateRangeType = 'sevenDays';
        this.customDateRange = DateUtils.getTodayRange();
      }
    });
  }

  save(): void {
    let dateRange: DateRange;

    switch (this.dateRangeType) {
      case 'sevenDays':
        dateRange = DateUtils.getSevenDays();
        break;
      case 'currentWeek':
        dateRange = DateUtils.getCurrentWeek();
        break;
      case 'nextWeek':
        dateRange = DateUtils.getNextWeek();
        break;
      case 'currentMonth':
        dateRange = DateUtils.getCurrentMonth();
        break;
      default:
        dateRange = this.customDateRange;
        break;
    }

    this.storageService.setDateRange({
      type: this.dateRangeType,
      dateRange: dateRange
    });
  }

}
