import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSstComponent } from './sidebar-sst.component';

describe('SidebarSstComponent', () => {
  let component: SidebarSstComponent;
  let fixture: ComponentFixture<SidebarSstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarSstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarSstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
