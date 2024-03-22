/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { APILocationService } from './APILocation.service';

describe('Service: APILocation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APILocationService]
    });
  });

  it('should ...', inject([APILocationService], (service: APILocationService) => {
    expect(service).toBeTruthy();
  }));
});
