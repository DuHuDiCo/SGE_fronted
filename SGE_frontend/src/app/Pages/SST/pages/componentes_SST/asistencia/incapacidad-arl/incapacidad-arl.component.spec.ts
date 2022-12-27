import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncapacidadArlComponent } from './incapacidad-arl.component';

describe('IncapacidadArlComponent', () => {
  let component: IncapacidadArlComponent;
  let fixture: ComponentFixture<IncapacidadArlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncapacidadArlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncapacidadArlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
