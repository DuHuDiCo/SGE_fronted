import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsAsignacionComponent } from './options-asignacion.component';

describe('OptionsAsignacionComponent', () => {
  let component: OptionsAsignacionComponent;
  let fixture: ComponentFixture<OptionsAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsAsignacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
