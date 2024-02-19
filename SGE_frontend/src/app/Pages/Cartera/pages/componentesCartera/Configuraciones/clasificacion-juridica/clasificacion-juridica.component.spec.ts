import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionJuridicaComponent } from './clasificacion-juridica.component';

describe('ClasificacionJuridicaComponent', () => {
  let component: ClasificacionJuridicaComponent;
  let fixture: ComponentFixture<ClasificacionJuridicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasificacionJuridicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasificacionJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
