import { Component } from '@angular/core';
import { LocaleService, Language, TranslationService, DefaultLocale, Currency } from 'angular-l10n';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

class Locale {
  key: string;
  lang: string;
  countryCode: string;
  currency: string;
  numberingSystem: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @Currency()
  currency: string;

  @DefaultLocale()
  defaultLocale: string;

  @Language()
  currentLang: string;

  selectControl: FormControl = new FormControl(this.localeService.getCurrentLanguage());

  today: Date = new Date();

  locales: Locale[] = [
    { key: 'languages.english',  lang: 'en', countryCode: 'US', currency: 'USD', numberingSystem: 'latn' },
    { key: 'languages.portuguese', lang: 'pt', countryCode: 'BR', currency: 'BRL', numberingSystem: 'latn' }
  ];

  constructor(private localeService: LocaleService, translationService: TranslationService) {
    this.selectControl.valueChanges
      .pipe(
        map(value => this.locales.find(item => item.lang === value))
      )
      .subscribe(value => this.setLocale(value));
  }

  setLocale(locale: Locale) {
    this.localeService.setDefaultLocale(locale.lang, locale.countryCode, '', locale.numberingSystem);
    this.localeService.setCurrentCurrency(locale.currency);
  }

}
