import { Component } from '@angular/core';

import { NavController, NavParams, ToastController } from 'ionic-angular';

import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

import Criterion from '../../models/criterion.model';

@Component({
  selector: 'page-criteria',
  templateUrl: 'criteria.html'
})
export class CriteriaPage {

  private criteriaType: number = 0;

  private cache: {[key: number]: Criterion[]} = {};

  criteria: Criterion[] = [];

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private navController: NavController,
    private toastController: ToastController
  ) { }

  get criteriaTypeModel(): string {
    return this.criteriaType.toString();
  }

  set criteriaTypeModel(criteriaType: string) {
    this.criteriaType = +criteriaType;
    this.loadCriteria();
  }

  ionViewDidEnter(): void {
    this.loadCriteria();
  }

  loadCriteria(): void {
    let cachedCriteria = this.cache[this.criteriaType];
    if (cachedCriteria) {
      this.criteria = cachedCriteria;
      return;
    }
    this.loadCriteriaFromServer();
  }

  loadCriteriaFromServer(): void {
    this.apiService
      .getCriteria(this.criteriaType)
      .then(this.onCriteriaLoaded.bind(this))
      .catch(this.showErrorMessage.bind(this));
  }

  onCriteriaLoaded(criteria): void {
    this.criteria = criteria;
    this.cache[this.criteriaType] = criteria;
  }

  showErrorMessage(): void {
    let toast = this.toastController.create({
      message: 'Не удалось загрузить данные',
      duration: 3000
    });
    toast.present();
  }

  select(criterionId: string): void {
    this.storageService.setCriterion({
      typeId: this.criteriaType,
      id: criterionId
    });
    this.navController.pop();
  }

}
