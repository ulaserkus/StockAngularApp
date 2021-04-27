/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MinistaryService } from './ministary.service';

describe('Service: Ministary', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MinistaryService]
    });
  });

  it('should ...', inject([MinistaryService], (service: MinistaryService) => {
    expect(service).toBeTruthy();
  }));
});
