import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtourneComponent } from './extourne.component';

describe('ExtourneComponent', () => {
  let component: ExtourneComponent;
  let fixture: ComponentFixture<ExtourneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtourneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtourneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
