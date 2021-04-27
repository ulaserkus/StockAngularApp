/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DoctorAuthGuardService } from './doctor-auth-guard.service';

describe('Service: DoctorAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorAuthGuardService]
    });
  });

  it('should ...', inject([DoctorAuthGuardService], (service: DoctorAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
