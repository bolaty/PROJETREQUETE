import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionClientComponent } from './edition-client.component';

describe('EditionClientComponent', () => {
  let component: EditionClientComponent;
  let fixture: ComponentFixture<EditionClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
