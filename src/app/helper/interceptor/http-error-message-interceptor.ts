import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getApiEndpointFromUrl } from '../http/http.functions';
import { HTTP_METHOD } from '../../../contracts/http';

export type MappedEndpoint = 'events';

const mappedEndpoints: Record<MappedEndpoint, Record<HTTP_METHOD, boolean>> = {
  events: {
    PATCH: true,
    GET: false,
    POST: false,
    DELETE: false,
    PUT: false
  }
}

@Injectable()
export class HttpErrorMessageInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const specificEndpoint = getApiEndpointFromUrl(request.url) as MappedEndpoint;
    const method = request.method as HTTP_METHOD;

    const hasEndpointCustomErrorMessage = mappedEndpoints[specificEndpoint]?.[method] ?? false;

    if (!hasEndpointCustomErrorMessage) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError(error => {
        switch (specificEndpoint) {
          case 'events': {
            this._snackBar.open(`Could not update event. Please try again in a few moments.`);
            break;
          }
        }
        throw error;
      })
    );
  }
}
