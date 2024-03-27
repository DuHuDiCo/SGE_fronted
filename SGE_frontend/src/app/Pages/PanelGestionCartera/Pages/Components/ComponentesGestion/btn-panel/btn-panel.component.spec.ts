import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPanelComponent } from './btn-panel.component';

describe('BtnPanelComponent', () => {
  let component: BtnPanelComponent;
  let fixture: ComponentFixture<BtnPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
