import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarClientesComponent } from './buscar-clientes.component';

describe('BuscarClientesComponent', () => {
  let component: BuscarClientesComponent;
  let fixture: ComponentFixture<BuscarClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
