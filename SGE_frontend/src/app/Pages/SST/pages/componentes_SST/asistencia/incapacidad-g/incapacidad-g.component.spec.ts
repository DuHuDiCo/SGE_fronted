import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncapacidadGComponent } from './incapacidad-g.component';

describe('IncapacidadGComponent', () => {
  let component: IncapacidadGComponent;
  let fixture: ComponentFixture<IncapacidadGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncapacidadGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncapacidadGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
