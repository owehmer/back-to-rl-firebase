import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authKey = 'Authorization';

    if (!request.url.toLowerCase().startsWith('/api/') || request.headers.has(authKey)) {
      return next.handle(request);
    }

    return this._authService.userJwt$.pipe(
      take(1),
      switchMap(jwt => {
        if (jwt) {
          request = request.clone({
            setHeaders: {
              [authKey]: `Bearer ${jwt}`
            }
          });
        }
        return next.handle(request);
      })
    );
  }
}
