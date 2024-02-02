import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreDeControleComponent } from './centre-de-controle.component';

describe('CentreDeControleComponent', () => {
  let component: CentreDeControleComponent;
  let fixture: ComponentFixture<CentreDeControleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentreDeControleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentreDeControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
