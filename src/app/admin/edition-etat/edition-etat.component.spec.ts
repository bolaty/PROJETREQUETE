import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionEtatComponent } from './edition-etat.component';

describe('EditionEtatComponent', () => {
  let component: EditionEtatComponent;
  let fixture: ComponentFixture<EditionEtatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionEtatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionEtatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
