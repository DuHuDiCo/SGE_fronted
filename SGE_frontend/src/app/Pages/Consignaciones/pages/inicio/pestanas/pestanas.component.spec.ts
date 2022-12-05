import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PestanasComponent } from './pestanas.component';

describe('PestanasComponent', () => {
  let component: PestanasComponent;
  let fixture: ComponentFixture<PestanasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PestanasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PestanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
