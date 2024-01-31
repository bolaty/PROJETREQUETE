import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneeExerciceComponent } from './journee-exercice.component';

describe('JourneeExerciceComponent', () => {
  let component: JourneeExerciceComponent;
  let fixture: ComponentFixture<JourneeExerciceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneeExerciceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JourneeExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
