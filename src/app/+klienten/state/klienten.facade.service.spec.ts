import { TestBed } from '@angular/core/testing';
import { Klienten

.
FacadeService
}
from
'./klienten.facade.service';

describe('Klienten.FacadeService', () => {
  let service: Klienten.FacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Klienten.FacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
