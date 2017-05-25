import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import offlineRuntime from 'offline-plugin/runtime';

import { AppModule } from './app.module';
import AppCacheUtils from '../utils/app-cache.utils';

// offlineRuntime.install({
//   onUpdateReady: () => {
//     offlineRuntime.applyUpdate();
//   }
// });

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('service-worker.js')
//     .then(() => console.log('service worker installed'))
//     .catch(err => console.log('Error', err));
// } else {
  AppCacheUtils.injectAppCache('manifest.appcache');
// }

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
