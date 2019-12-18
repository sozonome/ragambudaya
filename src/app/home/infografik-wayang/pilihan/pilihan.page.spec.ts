import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PilihanPage } from './pilihan.page';

describe('PilihanPage', () => {
  let component: PilihanPage;
  let fixture: ComponentFixture<PilihanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PilihanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PilihanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
