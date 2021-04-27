/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HealthunitService } from './healthunit.service';

describe('Service: Healthunit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthunitService]
    });
  });

  it('should ...', inject([HealthunitService], (service: HealthunitService) => {
    expect(service).toBeTruthy();
  }));
});
