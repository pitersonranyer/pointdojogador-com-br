import { TestBed } from '@angular/core/testing';

import { CartolaAPIService } from './cartola-api.service';

describe('CartolaAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartolaAPIService = TestBed.get(CartolaAPIService);
    expect(service).toBeTruthy();
  });
});
