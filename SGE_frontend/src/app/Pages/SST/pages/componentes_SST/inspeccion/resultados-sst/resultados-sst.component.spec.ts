import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosSstComponent } from './resultados-sst.component';

describe('ResultadosSstComponent', () => {
  let component: ResultadosSstComponent;
  let fixture: ComponentFixture<ResultadosSstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosSstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosSstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
