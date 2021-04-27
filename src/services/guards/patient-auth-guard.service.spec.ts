/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PatientAuthGuardService } from './patient-auth-guard.service';

describe('Service: PatientAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientAuthGuardService]
    });
  });

  it('should ...', inject([PatientAuthGuardService], (service: PatientAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
