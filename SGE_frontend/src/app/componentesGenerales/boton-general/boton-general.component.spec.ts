import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonGeneralComponent } from './boton-general.component';

describe('BotonGeneralComponent', () => {
  let component: BotonGeneralComponent;
  let fixture: ComponentFixture<BotonGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
