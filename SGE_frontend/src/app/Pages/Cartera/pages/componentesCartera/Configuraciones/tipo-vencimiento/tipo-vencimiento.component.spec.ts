import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVencimientoComponent } from './tipo-vencimiento.component';

describe('TipoVencimientoComponent', () => {
  let component: TipoVencimientoComponent;
  let fixture: ComponentFixture<TipoVencimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoVencimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoVencimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
