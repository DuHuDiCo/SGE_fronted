import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarConsignacionesComponent } from './sidebar-consignaciones.component';

describe('SidebarConsignacionesComponent', () => {
  let component: SidebarConsignacionesComponent;
  let fixture: ComponentFixture<SidebarConsignacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarConsignacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarConsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
