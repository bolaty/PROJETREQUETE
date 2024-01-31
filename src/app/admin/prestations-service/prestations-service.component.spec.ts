import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationsServiceComponent } from './prestations-service.component';

describe('PrestationsServiceComponent', () => {
  let component: PrestationsServiceComponent;
  let fixture: ComponentFixture<PrestationsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestationsServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestationsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
