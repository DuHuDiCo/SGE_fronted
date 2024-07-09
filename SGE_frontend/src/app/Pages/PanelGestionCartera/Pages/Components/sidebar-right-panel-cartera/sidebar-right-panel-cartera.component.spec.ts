import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRightPanelCarteraComponent } from './sidebar-right-panel-cartera.component';

describe('SidebarRightPanelCarteraComponent', () => {
  let component: SidebarRightPanelCarteraComponent;
  let fixture: ComponentFixture<SidebarRightPanelCarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarRightPanelCarteraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarRightPanelCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
