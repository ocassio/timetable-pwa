import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { TimetablePage } from '../pages/timetable/timetable';
import { CriteriaPage } from '../pages/criteria/criteria';
import { DatePage } from '../pages/date/date';

import { CriteriaPipe } from '../pipes/criteria.pipe';

import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';

const config = {
  platforms: {
    ios: {
      backButtonText: 'Назад'
    }
  },
  monthShortNames: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
};

const deepLinkConfiguration: DeepLinkConfig = {
  links: [
    {
      name: 'timetable',
      segment: '',
      component: TimetablePage,
      defaultHistory: []
    },
    {
      name: 'criteria',
      segment: 'criteria',
      component: CriteriaPage,
      defaultHistory: ['timetable']
    },
    {
      name: 'date',
      segment: 'date',
      component: DatePage,
      defaultHistory: ['timetable']
    }
  ]
};

// Hack for proper URL handling in iOS Web App
const deepLinkConfig = !('standalone' in window.navigator) ? deepLinkConfiguration : null;

@NgModule({
  declarations: [
    MyApp,
    TimetablePage,
    CriteriaPage,
    DatePage,
    CriteriaPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, config, deepLinkConfig),
    IonicStorageModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TimetablePage,
    CriteriaPage,
    DatePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiService,
    StorageService
  ]
})
export class AppModule {}
