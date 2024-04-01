import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReferenciaComponent } from './modal-referencia.component';

describe('ModalReferenciaComponent', () => {
  let component: ModalReferenciaComponent;
  let fixture: ComponentFixture<ModalReferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReferenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
