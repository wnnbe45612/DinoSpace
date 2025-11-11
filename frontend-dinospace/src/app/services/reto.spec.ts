import { TestBed } from '@angular/core/testing';

import { Reto } from './reto';

describe('Reto', () => {
  let service: Reto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Reto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
