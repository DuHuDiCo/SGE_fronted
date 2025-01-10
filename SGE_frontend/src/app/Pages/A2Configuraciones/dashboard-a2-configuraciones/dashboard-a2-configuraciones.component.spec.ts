import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardA2ConfiguracionesComponent } from './dashboard-a2-configuraciones.component';

describe('DashboardA2ConfiguracionesComponent', () => {
  let component: DashboardA2ConfiguracionesComponent;
  let fixture: ComponentFixture<DashboardA2ConfiguracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardA2ConfiguracionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardA2ConfiguracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
