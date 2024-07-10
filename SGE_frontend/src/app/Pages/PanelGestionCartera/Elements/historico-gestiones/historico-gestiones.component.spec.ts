import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoGestionesComponent } from './historico-gestiones.component';

describe('HistoricoGestionesComponent', () => {
  let component: HistoricoGestionesComponent;
  let fixture: ComponentFixture<HistoricoGestionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoGestionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoGestionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
