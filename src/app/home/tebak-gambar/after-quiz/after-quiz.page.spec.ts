import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterQuizPage } from './after-quiz.page';

describe('AfterQuizPage', () => {
  let component: AfterQuizPage;
  let fixture: ComponentFixture<AfterQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterQuizPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
