import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCajaComponent } from './sidebar-caja.component';

describe('SidebarCajaComponent', () => {
  let component: SidebarCajaComponent;
  let fixture: ComponentFixture<SidebarCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
