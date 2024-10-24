import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarUsuariosComponent } from './listar-usuarios.component';

describe('BuscarUsuariosComponent', () => {
  let component: BuscarUsuariosComponent;
  let fixture: ComponentFixture<BuscarUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
