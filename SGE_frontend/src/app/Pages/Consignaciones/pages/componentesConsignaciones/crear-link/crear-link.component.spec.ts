import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLinkComponent } from './crear-link.component';

describe('CrearLinkComponent', () => {
  let component: CrearLinkComponent;
  let fixture: ComponentFixture<CrearLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
