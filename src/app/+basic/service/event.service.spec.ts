import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import { EventApiService } from './event-api.service';
import { EventDbService } from './event-db.service';
import { of } from 'rxjs';

describe('EventService', () => {
  function _setup() {
    const mockApiService = {} as Partial<EventApiService>;

    const mockDbService = {
      events$: of([
        {
          id: '123',
          status: 'OPEN'
        }
      ])
    } as Partial<EventDbService>;

    TestBed.configureTestingModule({
      providers: [
        { provide: EventApiService, useValue: mockApiService },
        { provide: EventDbService, useValue: mockDbService }
      ]
    });

    const service = TestBed.inject(EventService);

    return { service };
  }

  it('should be created', () => {
    const { service } = _setup();
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    const { service } = _setup();
    expect(service).toBeTruthy();
  });
});
