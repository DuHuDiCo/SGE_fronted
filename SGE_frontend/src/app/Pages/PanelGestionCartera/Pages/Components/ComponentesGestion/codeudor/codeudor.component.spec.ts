import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeudorComponent } from './codeudor.component';

describe('CodeudorComponent', () => {
  let component: CodeudorComponent;
  let fixture: ComponentFixture<CodeudorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeudorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeudorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
