import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoObligacionComponent } from './tipo-obligacion.component';

describe('TipoObligacionComponent', () => {
  let component: TipoObligacionComponent;
  let fixture: ComponentFixture<TipoObligacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoObligacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoObligacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
