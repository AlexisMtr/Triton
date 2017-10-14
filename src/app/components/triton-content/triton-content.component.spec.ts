import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TritonContentComponent } from './triton-content.component';

describe('TritonContentComponent', () => {
  let component: TritonContentComponent;
  let fixture: ComponentFixture<TritonContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TritonContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TritonContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
