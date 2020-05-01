import { TestBed } from '@angular/core/testing';

import { OauthUserService } from './oauth-user.service';

describe('OauthUserService', () => {
  let service: OauthUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OauthUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
