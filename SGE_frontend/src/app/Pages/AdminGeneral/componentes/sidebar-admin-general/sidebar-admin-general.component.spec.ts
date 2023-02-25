import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAdminGeneralComponent } from './sidebar-admin-general.component';

describe('SidebarAdminGeneralComponent', () => {
  let component: SidebarAdminGeneralComponent;
  let fixture: ComponentFixture<SidebarAdminGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarAdminGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAdminGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
