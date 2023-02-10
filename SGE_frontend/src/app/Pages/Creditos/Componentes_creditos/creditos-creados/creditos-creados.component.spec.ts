import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditosCreadosComponent } from './creditos-creados.component';

describe('CreditosCreadosComponent', () => {
  let component: CreditosCreadosComponent;
  let fixture: ComponentFixture<CreditosCreadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditosCreadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditosCreadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
