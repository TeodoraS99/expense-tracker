import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import '@angular/compiler';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { SummaryComponent } from './app/components/summary/summary.component';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


if ((window as any).ENABLE_PROD_MODE) {
  enableProdMode();
}

bootstrapApplication(SummaryComponent);