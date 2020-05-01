import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisionsComponent } from './permisions.component';

describe('PermisionsComponent', () => {
  let component: PermisionsComponent;
  let fixture: ComponentFixture<PermisionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
