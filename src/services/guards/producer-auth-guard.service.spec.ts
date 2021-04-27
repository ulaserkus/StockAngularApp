/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProducerAuthGuardService } from './producer-auth-guard.service';

describe('Service: ProducerAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProducerAuthGuardService]
    });
  });

  it('should ...', inject([ProducerAuthGuardService], (service: ProducerAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
