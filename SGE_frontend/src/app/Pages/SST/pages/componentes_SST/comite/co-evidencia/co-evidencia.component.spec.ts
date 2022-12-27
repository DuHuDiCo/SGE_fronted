import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoEvidenciaComponent } from './co-evidencia.component';

describe('CoEvidenciaComponent', () => {
  let component: CoEvidenciaComponent;
  let fixture: ComponentFixture<CoEvidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoEvidenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoEvidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
