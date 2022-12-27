import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Evalucion1Component } from './evalucion1.component';

describe('Evalucion1Component', () => {
  let component: Evalucion1Component;
  let fixture: ComponentFixture<Evalucion1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Evalucion1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Evalucion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
