import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsSharedComponent } from './documents-shared.component';

describe('DocumentsSharedComponent', () => {
  let component: DocumentsSharedComponent;
  let fixture: ComponentFixture<DocumentsSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
