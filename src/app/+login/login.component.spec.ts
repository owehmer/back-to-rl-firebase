import { TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PATH_AFTER_LOGIN_TOKEN } from '../app.routes';

describe('LoginComponent', () => {
  async function _setup(config?: { shouldLoginFail?: boolean }) {
    const mockAuthService = {
      logout: jest.fn(),
      loginWithMail: () => {
        if (config?.shouldLoginFail) {
          return Promise.reject('foo bar');
        }
        return Promise.resolve();
      }
    } as Partial<AuthService>;

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: LoginComponent
          },
          {
            path: 'login-success',
            component: LoginComponent // To not import any more components into this test
          }
        ])
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: PATH_AFTER_LOGIN_TOKEN, useValue: 'login-success' }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    const location = TestBed.inject(Location);

    return { fixture, component, router, location };
  }

  it('should create', async () => {
    const { fixture, component } = await _setup();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should stay on the same page when credentials are invalid', async () => {
    const { fixture, component, router, location } = await _setup({ shouldLoginFail: true });
    router.initialNavigation();
    fixture.detectChanges();

    // Trigger the form submit event
    await component.login();

    expect(location.path()).toBe('/');
  });

  it('should route when credentials are valid', async () => {
    const { fixture, component, router, location } = await _setup({ shouldLoginFail: false });
    router.initialNavigation();
    fixture.detectChanges();

    // Trigger the form submit event
    await component.login();

    expect(location.path()).toBe('/login-success');
  });
});
