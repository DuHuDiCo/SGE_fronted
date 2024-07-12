import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmacionNovedadComponent } from './modal-confirmacion-novedad.component';

describe('ModalConfirmacionNovedadComponent', () => {
  let component: ModalConfirmacionNovedadComponent;
  let fixture: ComponentFixture<ModalConfirmacionNovedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmacionNovedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfirmacionNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
