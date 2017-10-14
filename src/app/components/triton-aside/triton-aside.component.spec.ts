import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TritonAsideComponent } from './triton-aside.component';

describe('TritonAsideComponent', () => {
  let component: TritonAsideComponent;
  let fixture: ComponentFixture<TritonAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TritonAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TritonAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
