import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadreMensualComponent } from './cuadre-mensual.component';

describe('CuadreMensualComponent', () => {
  let component: CuadreMensualComponent;
  let fixture: ComponentFixture<CuadreMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuadreMensualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuadreMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
