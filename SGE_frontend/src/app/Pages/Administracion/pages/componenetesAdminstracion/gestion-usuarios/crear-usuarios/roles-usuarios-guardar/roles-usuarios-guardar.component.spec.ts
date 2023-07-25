import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesUsuariosGuardarComponent } from './roles-usuarios-guardar.component';

describe('RolesUsuariosGuardarComponent', () => {
  let component: RolesUsuariosGuardarComponent;
  let fixture: ComponentFixture<RolesUsuariosGuardarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesUsuariosGuardarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesUsuariosGuardarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
