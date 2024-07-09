import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoGestionComponent } from './modo-gestion.component';

describe('ModoGestionComponent', () => {
  let component: ModoGestionComponent;
  let fixture: ComponentFixture<ModoGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModoGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModoGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
