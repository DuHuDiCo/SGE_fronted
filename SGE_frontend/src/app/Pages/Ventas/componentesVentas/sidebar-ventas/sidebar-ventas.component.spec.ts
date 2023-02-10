import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarVentasComponent } from './sidebar-ventas.component';

describe('SidebarVentasComponent', () => {
  let component: SidebarVentasComponent;
  let fixture: ComponentFixture<SidebarVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
