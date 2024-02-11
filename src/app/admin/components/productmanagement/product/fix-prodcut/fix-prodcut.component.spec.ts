/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FixProdcutComponent } from './fix-prodcut.component';

describe('FixProdcutComponent', () => {
  let component: FixProdcutComponent;
  let fixture: ComponentFixture<FixProdcutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixProdcutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixProdcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
