import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSSTComponent } from './dashboard-sst.component';

describe('DashboardSSTComponent', () => {
  let component: DashboardSSTComponent;
  let fixture: ComponentFixture<DashboardSSTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSSTComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSSTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
