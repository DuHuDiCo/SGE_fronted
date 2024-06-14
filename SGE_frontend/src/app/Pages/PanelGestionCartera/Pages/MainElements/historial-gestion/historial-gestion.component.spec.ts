import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialGestionComponent } from './historial-gestion.component';

describe('HistorialGestionComponent', () => {
  let component: HistorialGestionComponent;
  let fixture: ComponentFixture<HistorialGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
