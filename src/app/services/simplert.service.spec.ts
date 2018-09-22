import { TestBed, inject } from '@angular/core/testing';

import { SimplertService } from './simplert.service';

describe('SimplertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimplertService]
    });
  });

  it('should be created', inject([SimplertService], (service: SimplertService) => {
    expect(service).toBeTruthy();
  }));
});
