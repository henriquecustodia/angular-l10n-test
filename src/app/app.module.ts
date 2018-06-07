import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocalizationModule, L10nConfig, ProviderType, L10nLoader } from 'angular-l10n';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const l10nConfig: L10nConfig = {
  locale: {
    languages: [
      { code: 'en', dir: 'ltr' },
      { code: 'pt', dir: 'ltr' }
    ],
    defaultLocale: { languageCode: 'pt', countryCode: 'BR' },
    currency: 'BRL',

  },
  translation: {
    providers: [
      { type: ProviderType.Static, prefix: './assets/i18n/' }
    ],
    caching: true,
    missingValue: 'No key',
    composedKeySeparator: '.',
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    LocalizationModule.forRoot(l10nConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(l10nLoader: L10nLoader) {
    l10nLoader.load().then(() => {
      console.log('loaded');
    });
  }
}
