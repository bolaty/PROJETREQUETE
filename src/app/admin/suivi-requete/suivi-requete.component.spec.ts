import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviRequeteComponent } from './suivi-requete.component';

describe('SuiviRequeteComponent', () => {
  let component: SuiviRequeteComponent;
  let fixture: ComponentFixture<SuiviRequeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiviRequeteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuiviRequeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
