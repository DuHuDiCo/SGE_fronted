import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasNovedadesComponent } from './offcanvas-novedades.component';

describe('OffcanvasNovedadesComponent', () => {
  let component: OffcanvasNovedadesComponent;
  let fixture: ComponentFixture<OffcanvasNovedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffcanvasNovedadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffcanvasNovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
