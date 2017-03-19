import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, ToastController, Toast, Content } from 'ionic-angular';

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

  showSearchBar: boolean = false;
  searchQuery: string = '';

  @ViewChild(Content)
  content: Content;

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

  ionViewWillEnter(): void {
    this.storageService
      .getCriterion()
      .then(criterionData => {
        if (criterionData) {
          this.criteriaType = criterionData.typeId;
        }
        this.loadCriteria();
      });
  }

  loadCriteria(): void {
    let cachedCriteria = this.cache[this.criteriaType];
    if (cachedCriteria) {
      this.criteria = cachedCriteria;
      this.content.scrollToTop();
      return;
    }
    this.loadCriteriaFromServer();
  }

  loadCriteriaFromServer(): void {
    let toast = this.toastController.create({
      message: 'Обновляем данные...'
    });
    toast.present();

    this.apiService
      .getCriteria(this.criteriaType)
      .then(this.onCriteriaLoaded.bind(this, toast))
      .catch(this.showErrorMessage.bind(this, toast));
  }

  onCriteriaLoaded(toast: Toast, criteria: Criterion[]): void {
    this.criteria = criteria;
    toast.dismiss();
    this.content.scrollToTop();
    this.cache[this.criteriaType] = criteria;
  }

  showErrorMessage(toast: Toast): void {
    toast.dismiss();
    let erorrToast = this.toastController.create({
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

  onSearchQueryChanged(): void {
    this.content.scrollToTop();
  }

  toggleSearch(): void {
    this.showSearchBar = !this.showSearchBar;
    this.content.resize();
    if (!this.showSearchBar) {
      this.searchQuery = '';
    }
  }

}
