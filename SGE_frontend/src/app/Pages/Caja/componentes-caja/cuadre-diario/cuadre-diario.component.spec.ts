import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadreDiarioComponent } from './cuadre-diario.component';

describe('CuadreDiarioComponent', () => {
  let component: CuadreDiarioComponent;
  let fixture: ComponentFixture<CuadreDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuadreDiarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuadreDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
