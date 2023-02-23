import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardServiciosComponent } from './dashboard-servicios.component';

describe('DashboardServiciosComponent', () => {
  let component: DashboardServiciosComponent;
  let fixture: ComponentFixture<DashboardServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardServiciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
