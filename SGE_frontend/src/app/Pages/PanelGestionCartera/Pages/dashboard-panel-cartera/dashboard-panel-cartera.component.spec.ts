import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPanelCarteraComponent } from './dashboard-panel-cartera.component';

describe('DashboardPanelCarteraComponent', () => {
  let component: DashboardPanelCarteraComponent;
  let fixture: ComponentFixture<DashboardPanelCarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPanelCarteraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPanelCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
