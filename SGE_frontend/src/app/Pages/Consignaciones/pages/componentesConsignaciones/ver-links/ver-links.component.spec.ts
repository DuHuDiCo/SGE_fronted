import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerLinksComponent } from './ver-links.component';

describe('VerLinksComponent', () => {
  let component: VerLinksComponent;
  let fixture: ComponentFixture<VerLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
