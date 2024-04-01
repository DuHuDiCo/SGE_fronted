import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditDatoComponent } from './modal-edit-dato.component';

describe('ModalEditDatoComponent', () => {
  let component: ModalEditDatoComponent;
  let fixture: ComponentFixture<ModalEditDatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditDatoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditDatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
