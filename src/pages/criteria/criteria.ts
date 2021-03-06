import { Component, ViewChild } from '@angular/core';

import { NavController, ToastController, Content, Searchbar } from 'ionic-angular';

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

  @ViewChild(Searchbar)
  searchBar: Searchbar;

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

  async ionViewWillEnter(): Promise<void> {
    const criterionData = await this.storageService.getCriterion();
    if (criterionData) {
      this.criteriaType = criterionData.typeId;
    }
  }

  ionViewDidEnter(): void {
    this.loadCriteria();
  }

  loadCriteria(): void {
    let cachedCriteria = this.cache[this.criteriaType];
    if (cachedCriteria && cachedCriteria.length > 0) {
      this.criteria = cachedCriteria;
      this.content.scrollToTop();
      return;
    }
    this.loadCriteriaFromServer();
  }

  async loadCriteriaFromServer(): Promise<void> {
    let toast = this.toastController.create({
      message: 'Обновляем данные...'
    });
    toast.present();

    try {
      const criteria = await this.apiService.getCriteria(this.criteriaType);
      this.setCriteria(criteria);
    } catch (e) {
      this.showErrorMessage();
      this.setCriteria([]);
    }

    toast.dismiss();
  }

  setCriteria(criteria: Criterion[]): void {
    this.criteria = criteria;
    this.cache[this.criteriaType] = criteria;
    this.content.scrollToTop();
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

  onSearchQueryChanged(): void {
    this.content.scrollToTop();
  }

  toggleSearch(): void {
    this.showSearchBar = !this.showSearchBar;
    this.content.resize();
    if (this.showSearchBar) {
      setTimeout(() => this.searchBar.setFocus());
    } else {
      this.searchQuery = '';
    }
  }

}
