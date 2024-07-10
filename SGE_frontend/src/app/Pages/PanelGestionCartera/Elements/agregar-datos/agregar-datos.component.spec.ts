import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDatosComponent } from './agregar-datos.component';

describe('AgregarDatosComponent', () => {
  let component: AgregarDatosComponent;
  let fixture: ComponentFixture<AgregarDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
