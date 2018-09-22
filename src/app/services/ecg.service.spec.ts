import { TestBed, inject } from '@angular/core/testing';

import { EcgService } from './ecg.service';

describe('EcgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EcgService]
    });
  });

  it('should be created', inject([EcgService], (service: EcgService) => {
    expect(service).toBeTruthy();
  }));
});
