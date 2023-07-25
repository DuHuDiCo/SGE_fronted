import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPerfilComponent } from './sidebar-perfil.component';

describe('SidebarPerfilComponent', () => {
  let component: SidebarPerfilComponent;
  let fixture: ComponentFixture<SidebarPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
