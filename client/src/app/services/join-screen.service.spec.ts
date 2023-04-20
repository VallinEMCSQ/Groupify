import { TestBed } from '@angular/core/testing';

import { JoinScreenService } from './join-screen.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JoinScreenService', () => {
  let service: JoinScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(JoinScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
