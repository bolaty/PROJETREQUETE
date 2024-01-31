import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutresPrestationsComponent } from './autres-prestations.component';

describe('AutresPrestationsComponent', () => {
  let component: AutresPrestationsComponent;
  let fixture: ComponentFixture<AutresPrestationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutresPrestationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutresPrestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
