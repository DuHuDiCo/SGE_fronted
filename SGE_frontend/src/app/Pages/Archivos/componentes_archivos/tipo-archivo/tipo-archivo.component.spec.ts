import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoArchivoComponent } from './tipo-archivo.component';

describe('TipoArchivoComponent', () => {
  let component: TipoArchivoComponent;
  let fixture: ComponentFixture<TipoArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoArchivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
