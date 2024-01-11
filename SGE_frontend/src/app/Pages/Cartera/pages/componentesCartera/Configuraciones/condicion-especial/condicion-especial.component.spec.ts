import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionEspecialComponent } from './condicion-especial.component';

describe('CondicionEspecialComponent', () => {
  let component: CondicionEspecialComponent;
  let fixture: ComponentFixture<CondicionEspecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondicionEspecialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CondicionEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
