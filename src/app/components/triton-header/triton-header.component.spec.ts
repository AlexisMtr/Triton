import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TritonHeaderComponent } from './triton-header.component';

describe('TritonHeaderComponent', () => {
  let component: TritonHeaderComponent;
  let fixture: ComponentFixture<TritonHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TritonHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TritonHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
