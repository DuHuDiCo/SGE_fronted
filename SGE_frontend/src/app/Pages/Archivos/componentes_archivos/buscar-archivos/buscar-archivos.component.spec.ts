import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarArchivosComponent } from './buscar-archivos.component';

describe('BuscarArchivosComponent', () => {
  let component: BuscarArchivosComponent;
  let fixture: ComponentFixture<BuscarArchivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarArchivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
