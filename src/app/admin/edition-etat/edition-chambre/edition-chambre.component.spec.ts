import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionChambreComponent } from './edition-chambre.component';

describe('EditionChambreComponent', () => {
  let component: EditionChambreComponent;
  let fixture: ComponentFixture<EditionChambreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionChambreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionChambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
