import { TestBed } from '@angular/core/testing';

import { Consejo } from './consejo';

describe('Consejo', () => {
  let service: Consejo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Consejo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
