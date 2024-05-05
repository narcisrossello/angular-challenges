import { ApplicationRef } from '@angular/core';
import {
  bootstrapApplication,
  enableDebugTools,
} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .then((module) => {
    const appRef = module.injector.get(ApplicationRef);
    const appComponent = appRef.components[0];
    enableDebugTools(appComponent);
  })
  .catch(() => console.error);
