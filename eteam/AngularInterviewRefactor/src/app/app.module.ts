import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { TranslateICUParser } from 'ngx-translate-parser-plural-select/dist';

import {
  TranslateLoader,
  TranslateModule,
  TranslateCompiler,
  TranslateParser,
  TranslateService,
} from '@ngx-translate/core';
import { Location } from '@angular/common';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { RemoveDirective } from './remove.directive';
import { ErrorComponent } from './error/error.component';
import { BeforeComponent } from './int/before/before.component';
import { StartComponent } from './int/start/start.component';
import { InviteComponent } from './int/invite/invite.component';
import { BaseComponent } from './int/base/base.component';
import { RouterModule } from '@angular/router';
import {
  LocalizeRouterModule,
  LocalizeParser,
  LocalizeRouterSettings,
  ManualParserLoader,
} from '@gilsdav/ngx-translate-router';
import { InviteCancelComponent } from './int/invite-cancel/invite-cancel.component';
import { TextComponent } from './int/types/text/text.component';
import { InputComponent } from './int/types/input/input.component';
import { SelectOneComponent } from './int/types/select-one/select-one.component';
import { HardwareTestComponent } from './int/types/hardware-test/hardware-test.component';
import { SummaryComponent } from './int/types/summary/summary.component';
import { AssistentComponent } from './shared/assistent/assistent.component';
import { AnswerTextComponent } from './int/types/answer-text/answer-text.component';
import { AnswerSpeakComponent } from './int/types/answer-speak/answer-speak.component';
import { AnswerSelectOneComponent } from './int/types/answer-select-one/answer-select-one.component';
import { AnswerSelectManyComponent } from './int/types/answer-select-many/answer-select-many.component';
import { SelfReviewComponent } from './int/types/self-review/self-review.component';
import { QuestionMp3Component } from './int/types/question-mp3/question-mp3.component';
import { QuestionMp4Component } from './int/types/question-mp4/question-mp4.component';
import { MicComponent } from './mic/mic.component';
import { InterviewErrorComponent } from './interview-error/interview-error.component';
import { QuestionImgComponent } from './int/types/question-img/question-img.component';

// import * as Sentry from '@sentry/browser';
// import { environment } from 'src/environments/environment';

// Sentry.init({
//   dsn:
//     'https://22bb1cbfcb6a4491bbf65281a0acbfe0@o436300.ingest.sentry.io/5397190',
//   // TryCatch has to be configured to disable XMLHttpRequest wrapping, as we are going to handle
//   // http module exceptions manually in Angular's ErrorHandler and we don't want it to capture the same error twice.
//   // Please note that TryCatch configuration requires at least @sentry/browser v5.16.0.
//   integrations: [
//     new Sentry.Integrations.TryCatch({
//       XMLHttpRequest: false,
//     }),
//   ],
// });

// @Injectable()
// export class SentryErrorHandler implements ErrorHandler {
//   constructor() {}

//   extractError(error) {
//     // Try to unwrap zone.js error.
//     // https://github.com/angular/angular/blob/master/packages/core/src/util/errors.ts
//     if (error && error.ngOriginalError) {
//       error = error.ngOriginalError;
//     }

//     // We can handle messages and Error objects directly.
//     if (typeof error === 'string' || error instanceof Error) {
//       return error;
//     }

//     // If it's http module error, extract as much information from it as we can.
//     if (error instanceof HttpErrorResponse) {
//       // The `error` property of http exception can be either an `Error` object, which we can use directly...
//       if (error.error instanceof Error) {
//         return error.error;
//       }

//       // ... or an`ErrorEvent`, which can provide us with the message but no stack...
//       if (error.error instanceof ErrorEvent) {
//         return error.error.message;
//       }

//       // ...or the request body itself, which we can use as a message instead.
//       if (typeof error.error === 'string') {
//         return `Server returned code ${error.status} with body "${error.error}"`;
//       }

//       // If we don't have any detailed information, fallback to the request message itself.
//       return error.message;
//     }

//     // Skip if there's no error, and let user decide what to do with it.
//     return null;
//   }

//   handleError(error) {
//     const extractedError = this.extractError(error) || 'Handled unknown error';

//     // Capture handled exception and send it to Sentry.
//     const eventId = Sentry.captureException(extractedError);

//     // When in development mode, log the error to console for immediate feedback.
//     if (!environment.production) {
//       console.error(extractedError);
//     }

//     // Optionally show user dialog to provide details on what happened.
//     Sentry.showReportDialog({ eventId });
//   }
// }

@NgModule({
  declarations: [
    AppComponent,
    RemoveDirective,
    BaseComponent,
    InviteComponent,
    StartComponent,
    BeforeComponent,
    ErrorComponent,
    InviteCancelComponent,
    TextComponent,
    InputComponent,
    SelectOneComponent,
    HardwareTestComponent,
    SummaryComponent,
    AssistentComponent,
    AnswerTextComponent,
    AnswerSpeakComponent,
    AnswerSelectOneComponent,
    AnswerSelectManyComponent,
    SelfReviewComponent,
    QuestionMp3Component,
    QuestionMp4Component,
    MicComponent,
    InterviewErrorComponent,
    QuestionImgComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      parser: {
        provide: TranslateParser,
        useClass: TranslateICUParser,
      },
    }),

    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (translate, location, settings) =>
          new ManualParserLoader(translate, location, settings, ['en']),
        deps: [TranslateService, Location, LocalizeRouterSettings],
      },
    }),
  ],
  providers: [
    // { provide: ErrorHandler, useClass: SentryErrorHandler },
    Location,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
