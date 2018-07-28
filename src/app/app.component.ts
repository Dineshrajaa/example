import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>{{ 'HOME.TITLE' | translate }}</h2>
      <h3>{{'HOME.DEFAULT' | translate}}</h3>
      <label>
        {{ 'HOME.SELECT' | translate }}
        <select #langSelect (change)="translate.use(langSelect.value)">
          <option *ngFor="let lang of translate.getLangs()" [value]="lang" [selected]="lang === translate.currentLang">{{ lang }}</option>
        </select>
      </label>
    </div>
  `,
})
export class AppComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en-uk', 'en-us']);
    translate.setDefaultLang('en-uk');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? 'en-us' : 'en-uk');
  }
}
