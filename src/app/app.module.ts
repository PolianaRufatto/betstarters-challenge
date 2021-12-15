import { HTTP_INTERCEPTORS, HttpClientModule, HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { catchError, filter, map, Observable, throwError } from 'rxjs';

import { AppComponent } from './app.component';
import { FieldErrorComponent } from './components/field-error/field-error.component';
import { GeoInfosComponent } from './components/geo-infos/geo-infos.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CatalogService } from './services/catalog.service';


class ConfigFactory implements HttpInterceptor {
  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {

    let headers = new HttpHeaders({'Accept-Language': 'en'});

    headers = headers.append('BookmakerId', `4`);

    return next.handle(req.clone({headers})).pipe(
      catchError(event => this.handleError(event)),
      filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
      map((r: HttpResponse<T>) => r.body && 'data' in r.body ? r.clone({body: (r.body as any).data}) : r)
    );
  }

  private handleError = (error: any) => {

    // Log.error(error);
    console.error(error);

    return throwError({
      status: {
        code: error.status,
        text: error.statusText
      },
      message: error.error.message,
      details: error.error.details,
      url: error.url
    });
  }
}


@NgModule({
  declarations: [
    AppComponent,
    FieldErrorComponent,
    RegistrationComponent,
    GeoInfosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CatalogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ConfigFactory,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
