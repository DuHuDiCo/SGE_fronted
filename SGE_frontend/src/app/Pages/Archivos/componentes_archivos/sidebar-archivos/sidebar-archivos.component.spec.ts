import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarArchivosComponent } from './sidebar-archivos.component';

describe('SidebarArchivosComponent', () => {
  let component: SidebarArchivosComponent;
  let fixture: ComponentFixture<SidebarArchivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarArchivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
