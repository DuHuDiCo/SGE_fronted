import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosGeneralesComponent } from './permisos-generales.component';

describe('PermisosGeneralesComponent', () => {
  let component: PermisosGeneralesComponent;
  let fixture: ComponentFixture<PermisosGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisosGeneralesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermisosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
