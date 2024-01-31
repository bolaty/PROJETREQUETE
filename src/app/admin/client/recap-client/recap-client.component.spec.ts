import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapClientComponent } from './recap-client.component';

describe('RecapClientComponent', () => {
  let component: RecapClientComponent;
  let fixture: ComponentFixture<RecapClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecapClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecapClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
