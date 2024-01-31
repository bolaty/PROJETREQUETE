import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionComptabiliteComponent } from './edition-comptabilite.component';

describe('EditionComptabiliteComponent', () => {
  let component: EditionComptabiliteComponent;
  let fixture: ComponentFixture<EditionComptabiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionComptabiliteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionComptabiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
