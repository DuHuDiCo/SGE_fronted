import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPanelCarteraComponent } from './sidebar-panel-cartera.component';

describe('SidebarPanelCarteraComponent', () => {
  let component: SidebarPanelCarteraComponent;
  let fixture: ComponentFixture<SidebarPanelCarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPanelCarteraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPanelCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
