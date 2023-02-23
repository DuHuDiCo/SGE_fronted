import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaChequeoComponent } from './lista-chequeo.component';

describe('ListaChequeoComponent', () => {
  let component: ListaChequeoComponent;
  let fixture: ComponentFixture<ListaChequeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaChequeoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaChequeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
