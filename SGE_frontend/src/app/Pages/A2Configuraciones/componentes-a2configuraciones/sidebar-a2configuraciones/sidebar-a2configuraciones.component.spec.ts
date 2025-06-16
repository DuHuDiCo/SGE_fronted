import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarA2configuracionesComponent } from './sidebar-a2configuraciones.component';

describe('SidebarA2configuracionesComponent', () => {
  let component: SidebarA2configuracionesComponent;
  let fixture: ComponentFixture<SidebarA2configuracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarA2configuracionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarA2configuracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
