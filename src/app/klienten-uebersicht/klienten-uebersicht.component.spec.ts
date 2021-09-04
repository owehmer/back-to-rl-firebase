import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlientenUebersichtComponent } from './klienten-uebersicht.component';

describe('KlientenUebersichtComponent', () => {
  let component: KlientenUebersichtComponent;
  let fixture: ComponentFixture<KlientenUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KlientenUebersichtComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlientenUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
