import { TestBed } from '@angular/core/testing';

import { TabComponentDataService } from './tab-component-data.service';

describe('TabComponentDataService', () => {
  let service: TabComponentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabComponentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
