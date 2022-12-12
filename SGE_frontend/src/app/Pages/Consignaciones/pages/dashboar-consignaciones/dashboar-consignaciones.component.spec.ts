import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboarConsignacionesComponent } from './dashboar-consignaciones.component';

describe('DashboarConsignacionesComponent', () => {
  let component: DashboarConsignacionesComponent;
  let fixture: ComponentFixture<DashboarConsignacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboarConsignacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboarConsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
