import { TestBed } from '@angular/core/testing';

import { PanelCarteraService } from './panel-cartera.service';

describe('PanelCarteraService', () => {
  let service: PanelCarteraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelCarteraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
