import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarteraComponent } from './home-cartera.component';

describe('HomeCarteraComponent', () => {
  let component: HomeCarteraComponent;
  let fixture: ComponentFixture<HomeCarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCarteraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
