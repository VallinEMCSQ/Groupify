import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { StartService } from './start.service';

describe('StartService', () => {
  let service: StartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[StartService, ActivatedRoute]
    });
    service = TestBed.inject(StartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
