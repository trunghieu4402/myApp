/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImageProcessService } from './ImageProcess.service';

describe('Service: ImageProcess', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageProcessService]
    });
  });

  it('should ...', inject([ImageProcessService], (service: ImageProcessService) => {
    expect(service).toBeTruthy();
  }));
});
