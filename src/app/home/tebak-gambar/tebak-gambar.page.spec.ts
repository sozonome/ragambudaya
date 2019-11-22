import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TebakGambarPage } from './tebak-gambar.page';

describe('TebakGambarPage', () => {
  let component: TebakGambarPage;
  let fixture: ComponentFixture<TebakGambarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TebakGambarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TebakGambarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
