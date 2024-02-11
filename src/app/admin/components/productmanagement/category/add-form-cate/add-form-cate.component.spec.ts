import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormCateComponent } from './add-form-cate.component';

describe('AddFormCateComponent', () => {
  let component: AddFormCateComponent;
  let fixture: ComponentFixture<AddFormCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFormCateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFormCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
