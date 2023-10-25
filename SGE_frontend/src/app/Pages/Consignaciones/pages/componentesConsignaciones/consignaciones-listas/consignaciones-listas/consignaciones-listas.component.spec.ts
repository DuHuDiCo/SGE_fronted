import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignacionesListasComponent } from './consignaciones-listas.component';

describe('ConsignacionesListasComponent', () => {
  let component: ConsignacionesListasComponent;
  let fixture: ComponentFixture<ConsignacionesListasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsignacionesListasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsignacionesListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
