import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCreditoComponent } from './card-credito.component';

describe('CardCreditoComponent', () => {
  let component: CardCreditoComponent;
  let fixture: ComponentFixture<CardCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCreditoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
