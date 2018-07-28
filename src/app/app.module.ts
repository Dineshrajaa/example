import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PipeTransform, Inject } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, MissingTranslationHandler, TranslatePipe, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

class CustomHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    if (params.translateService.currentLang === params.translateService.defaultLang) {
      return params.key;
    } else {
      return '[MISSING]: ' + params.key;
    }
  }
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: CustomHandler }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

