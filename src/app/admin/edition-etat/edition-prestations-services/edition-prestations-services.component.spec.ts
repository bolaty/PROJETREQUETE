import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionPrestationsServicesComponent } from './edition-prestations-services.component';

describe('EditionPrestationsServicesComponent', () => {
  let component: EditionPrestationsServicesComponent;
  let fixture: ComponentFixture<EditionPrestationsServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionPrestationsServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionPrestationsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
