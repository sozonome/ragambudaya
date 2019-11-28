import { TestBed } from '@angular/core/testing';

import { WayangService } from './wayang.service';

describe('WayangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WayangService = TestBed.get(WayangService);
    expect(service).toBeTruthy();
  });
});
