import { TestBed } from '@angular/core/testing';

import { PotretBudayaService } from './potret-budaya.service';

describe('PotretBudayaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PotretBudayaService = TestBed.get(PotretBudayaService);
    expect(service).toBeTruthy();
  });
});
