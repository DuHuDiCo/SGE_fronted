import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCarteraComponent } from './sidebar-cartera.component';

describe('SidebarCarteraComponent', () => {
  let component: SidebarCarteraComponent;
  let fixture: ComponentFixture<SidebarCarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarCarteraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
