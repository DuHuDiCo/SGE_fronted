import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPanelCarteraComponent } from './navbar-panel-cartera.component';

describe('NavbarPanelCarteraComponent', () => {
  let component: NavbarPanelCarteraComponent;
  let fixture: ComponentFixture<NavbarPanelCarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarPanelCarteraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarPanelCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
