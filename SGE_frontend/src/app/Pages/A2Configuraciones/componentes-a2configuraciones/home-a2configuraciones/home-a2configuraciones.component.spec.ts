import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeA2configuracionesComponent } from './home-a2configuraciones.component';

describe('HomeA2configuracionesComponent', () => {
  let component: HomeA2configuracionesComponent;
  let fixture: ComponentFixture<HomeA2configuracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeA2configuracionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeA2configuracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
