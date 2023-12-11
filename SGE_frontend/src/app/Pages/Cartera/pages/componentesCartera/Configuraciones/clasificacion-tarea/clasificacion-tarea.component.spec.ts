import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionTareaComponent } from './clasificacion-tarea.component';

describe('ClasificacionTareaComponent', () => {
  let component: ClasificacionTareaComponent;
  let fixture: ComponentFixture<ClasificacionTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasificacionTareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasificacionTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
