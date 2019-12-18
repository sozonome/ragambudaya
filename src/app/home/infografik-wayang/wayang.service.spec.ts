import { TestBed } from '@angular/core/testing';

import { InfografikService } from './infografik.service';

describe('InfografikService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfografikService = TestBed.get(InfografikService);
    expect(service).toBeTruthy();
  });
});
