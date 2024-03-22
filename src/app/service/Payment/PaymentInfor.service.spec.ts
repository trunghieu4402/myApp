/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaymentInforService } from './PaymentInfor.service';

describe('Service: PaymentInfor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentInforService]
    });
  });

  it('should ...', inject([PaymentInforService], (service: PaymentInforService) => {
    expect(service).toBeTruthy();
  }));
});
