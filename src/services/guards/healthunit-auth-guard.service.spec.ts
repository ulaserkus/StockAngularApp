/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HealthunitAuthGuardService } from './healthunit-auth-guard.service';

describe('Service: HealthunitAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthunitAuthGuardService]
    });
  });

  it('should ...', inject([HealthunitAuthGuardService], (service: HealthunitAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
