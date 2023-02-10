import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosNComponent } from './archivos-n.component';

describe('ArchivosNComponent', () => {
  let component: ArchivosNComponent;
  let fixture: ComponentFixture<ArchivosNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivosNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivosNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
