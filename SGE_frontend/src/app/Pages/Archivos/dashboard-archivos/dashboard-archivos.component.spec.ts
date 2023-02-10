import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardArchivosComponent } from './dashboard-archivos.component';

describe('DashboardArchivosComponent', () => {
  let component: DashboardArchivosComponent;
  let fixture: ComponentFixture<DashboardArchivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardArchivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
