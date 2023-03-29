import { TestBed } from '@angular/core/testing';

import { StartService } from './start.service';

describe('StartService', () => {
  let service: StartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
