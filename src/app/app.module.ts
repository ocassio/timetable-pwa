import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import config from './app.config';

import { TimetablePage } from '../pages/timetable/timetable';
import { CriteriaPage } from '../pages/criteria/criteria';
import { DatePage } from '../pages/date/date';

import { CriteriaPipe } from '../pipes/criteria.pipe';

import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';

@NgModule({
  declarations: [
    MyApp,
    TimetablePage,
    CriteriaPage,
    DatePage,
    CriteriaPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp, config),
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
    Storage,
    ApiService,
    StorageService
  ]
})
export class AppModule {}
