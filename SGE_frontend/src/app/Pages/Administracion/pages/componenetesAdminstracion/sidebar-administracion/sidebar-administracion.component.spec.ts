import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAdministracionComponent } from './sidebar-administracion.component';

describe('SidebarAdministracionComponent', () => {
  let component: SidebarAdministracionComponent;
  let fixture: ComponentFixture<SidebarAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarAdministracionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
