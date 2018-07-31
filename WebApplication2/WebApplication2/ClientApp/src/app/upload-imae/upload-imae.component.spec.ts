import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImaeComponent } from './upload-imae.component';

describe('UploadImaeComponent', () => {
  let component: UploadImaeComponent;
  let fixture: ComponentFixture<UploadImaeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadImaeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
