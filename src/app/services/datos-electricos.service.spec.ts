import { TestBed } from '@angular/core/testing';

import { DatosElectricosService } from './datos-electricos.service';

describe('DatosElectricosService', () => {
  let service: DatosElectricosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosElectricosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
