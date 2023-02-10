import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCreditosComponent } from './ver-creditos.component';

describe('VerCreditosComponent', () => {
  let component: VerCreditosComponent;
  let fixture: ComponentFixture<VerCreditosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCreditosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCreditosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
