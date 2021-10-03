import { TestBed } from '@angular/core/testing';

import { EventApiService } from './event-api.service';
import { HttpClient } from '@angular/common/http';

describe('EventApiService', () => {
  function _setup() {
    const mockHttpClient = {
      patch: jest.fn()
    } as Partial<HttpClient>;

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
      ]
    });
    const service = TestBed.inject(EventApiService);

    return { service };
  }

  it('should be created', () => {
    const { service } = _setup();
    expect(service).toBeTruthy();
  });

  xit('should cancel any running http calls when update method is called again while request is still running', () => {
    // TODO: Marble test
  })
});
