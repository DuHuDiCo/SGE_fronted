import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosCarteraComponent } from './datos-cartera.component';

describe('DatosCarteraComponent', () => {
  let component: DatosCarteraComponent;
  let fixture: ComponentFixture<DatosCarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosCarteraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
