import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAsignacionComponent } from './gestion-asignacion.component';

describe('GestionAsignacionComponent', () => {
  let component: GestionAsignacionComponent;
  let fixture: ComponentFixture<GestionAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionAsignacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
