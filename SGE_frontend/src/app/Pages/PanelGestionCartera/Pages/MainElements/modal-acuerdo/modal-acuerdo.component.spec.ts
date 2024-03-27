import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAcuerdoComponent } from './modal-acuerdo.component';

describe('ModalAcuerdoComponent', () => {
  let component: ModalAcuerdoComponent;
  let fixture: ComponentFixture<ModalAcuerdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAcuerdoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAcuerdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
