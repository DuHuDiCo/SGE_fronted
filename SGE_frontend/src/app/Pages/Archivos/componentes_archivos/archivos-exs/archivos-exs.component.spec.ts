import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosExsComponent } from './archivos-exs.component';

describe('ArchivosExsComponent', () => {
  let component: ArchivosExsComponent;
  let fixture: ComponentFixture<ArchivosExsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivosExsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivosExsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
