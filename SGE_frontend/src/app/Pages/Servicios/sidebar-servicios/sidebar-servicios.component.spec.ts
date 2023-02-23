import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarServiciosComponent } from './sidebar-servicios.component';

describe('SidebarServiciosComponent', () => {
  let component: SidebarServiciosComponent;
  let fixture: ComponentFixture<SidebarServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarServiciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
