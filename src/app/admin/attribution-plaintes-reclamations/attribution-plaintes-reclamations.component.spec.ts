import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributionPlaintesReclamationsComponent } from './attribution-plaintes-reclamations.component';

describe('AttributionPlaintesReclamationsComponent', () => {
  let component: AttributionPlaintesReclamationsComponent;
  let fixture: ComponentFixture<AttributionPlaintesReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributionPlaintesReclamationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributionPlaintesReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
