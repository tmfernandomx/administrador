import { TestBed, async, inject } from '@angular/core/testing';

import { NoGuard } from './no.guard';

describe('NoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoGuard]
    });
  });

  it('should ...', inject([NoGuard], (guard: NoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
