import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsGestionComponent } from './options-gestion.component';

describe('OptionsGestionComponent', () => {
  let component: OptionsGestionComponent;
  let fixture: ComponentFixture<OptionsGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
