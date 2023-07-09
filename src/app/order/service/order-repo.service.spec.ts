import { TestBed } from '@angular/core/testing';

import { OrderRepoService } from './order-repo.service';

describe('OrderRepoService', () => {
  let service: OrderRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
