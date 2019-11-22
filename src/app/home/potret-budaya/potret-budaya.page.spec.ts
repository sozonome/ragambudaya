import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotretBudayaPage } from './potret-budaya.page';

describe('PotretBudayaPage', () => {
  let component: PotretBudayaPage;
  let fixture: ComponentFixture<PotretBudayaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotretBudayaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotretBudayaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
