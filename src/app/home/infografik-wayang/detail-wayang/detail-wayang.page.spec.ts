import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWayangPage } from './detail-wayang.page';

describe('DetailWayangPage', () => {
  let component: DetailWayangPage;
  let fixture: ComponentFixture<DetailWayangPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailWayangPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailWayangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
