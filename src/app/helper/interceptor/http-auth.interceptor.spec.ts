import { TestBed } from '@angular/core/testing';

import { HttpAuthInterceptor } from './http-auth.interceptor';
import { AuthService } from '../../auth/auth.service';
import { of } from 'rxjs';
import { HttpHandler, HttpRequest } from '@angular/common/http';

describe('HttpAuthInterceptor', () => {
  function _setup() {
    const authServiceMock = {
      userJwt$: of('foobar')
    } as Partial<AuthService>;

    TestBed.configureTestingModule({
      providers: [
        HttpAuthInterceptor,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });
  }

  it('should be created', () => {
    _setup();
    const interceptor: HttpAuthInterceptor = TestBed.inject(HttpAuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  xit('should not add an auth header to requests outside of /api', () => {
    _setup();
    const interceptor: HttpAuthInterceptor = TestBed.inject(HttpAuthInterceptor);

    const mockRequest = new HttpRequest('GET', 'testurl.com');
    const mockHandler = {
      handle: jest.fn().mockReturnValueOnce(of({}))
    } as HttpHandler;

    interceptor.intercept(mockRequest, mockHandler)
    expect(interceptor).toBeTruthy();
  });

  xit('should only append an auth header if no auth header is present on the request', () => {

  });

  xit('should add an auth header equal to the users jwt if no auth header was present', () => {

  });
});
