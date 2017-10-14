import { TestBed, inject } from '@angular/core/testing';

import { PoseidonApiService } from './poseidon-api.service';

describe('PoseidonApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoseidonApiService]
    });
  });

  it('should be created', inject([PoseidonApiService], (service: PoseidonApiService) => {
    expect(service).toBeTruthy();
  }));
});
