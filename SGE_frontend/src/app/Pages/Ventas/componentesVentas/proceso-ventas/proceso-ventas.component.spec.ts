import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoVentasComponent } from './proceso-ventas.component';

describe('ProcesoVentasComponent', () => {
  let component: ProcesoVentasComponent;
  let fixture: ComponentFixture<ProcesoVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
