import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCreditosComponent } from './dashboard-creditos.component';

describe('DashboardCreditosComponent', () => {
  let component: DashboardCreditosComponent;
  let fixture: ComponentFixture<DashboardCreditosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCreditosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCreditosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
