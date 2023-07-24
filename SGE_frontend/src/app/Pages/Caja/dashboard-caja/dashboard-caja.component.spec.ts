import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCajaComponent } from './dashboard-caja.component';

describe('DashboardCajaComponent', () => {
  let component: DashboardCajaComponent;
  let fixture: ComponentFixture<DashboardCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
