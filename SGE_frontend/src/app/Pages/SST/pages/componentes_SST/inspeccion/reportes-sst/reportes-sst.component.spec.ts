import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesSstComponent } from './reportes-sst.component';

describe('ReportesSstComponent', () => {
  let component: ReportesSstComponent;
  let fixture: ComponentFixture<ReportesSstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesSstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesSstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
