import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthUserComponent } from './oauth-user.component';

describe('OauthUserComponent', () => {
  let component: OauthUserComponent;
  let fixture: ComponentFixture<OauthUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OauthUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
