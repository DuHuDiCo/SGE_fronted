import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistoricoGesComponent } from './modal-historico-ges.component';

describe('ModalHistoricoGesComponent', () => {
  let component: ModalHistoricoGesComponent;
  let fixture: ComponentFixture<ModalHistoricoGesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHistoricoGesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHistoricoGesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
