import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarVariosClientesComponent } from './agregar-varios-clientes.component';

describe('AgregarVariosClientesComponent', () => {
  let component: AgregarVariosClientesComponent;
  let fixture: ComponentFixture<AgregarVariosClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarVariosClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarVariosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
