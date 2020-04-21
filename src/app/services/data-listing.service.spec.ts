import { TestBed } from '@angular/core/testing';

import { DataListingService } from './data-listing.service';

describe('DataListingServiceService', () => {
  let service: DataListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
