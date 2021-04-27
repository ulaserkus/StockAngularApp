/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProducerService } from './producer.service';

describe('Service: Producer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProducerService]
    });
  });

  it('should ...', inject([ProducerService], (service: ProducerService) => {
    expect(service).toBeTruthy();
  }));
});
