import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosObligacionComponent } from './estados-obligacion.component';

describe('EstadosObligacionComponent', () => {
  let component: EstadosObligacionComponent;
  let fixture: ComponentFixture<EstadosObligacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadosObligacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosObligacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
