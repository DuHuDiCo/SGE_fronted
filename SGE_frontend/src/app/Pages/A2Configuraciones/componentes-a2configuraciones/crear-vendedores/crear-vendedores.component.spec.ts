import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVendedoresComponent } from './crear-vendedores.component';

describe('CrearVendedoresComponent', () => {
  let component: CrearVendedoresComponent;
  let fixture: ComponentFixture<CrearVendedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearVendedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
