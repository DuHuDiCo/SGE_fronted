import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCreditoComponent } from './sidebar-credito.component';

describe('SidebarCreditoComponent', () => {
  let component: SidebarCreditoComponent;
  let fixture: ComponentFixture<SidebarCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarCreditoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
