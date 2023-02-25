import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPermisosComponent } from './system-permisos.component';

describe('SystemPermisosComponent', () => {
  let component: SystemPermisosComponent;
  let fixture: ComponentFixture<SystemPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemPermisosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
