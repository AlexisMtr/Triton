import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TritonLoginComponent } from './triton-login.component';

describe('TritonLoginComponent', () => {
  let component: TritonLoginComponent;
  let fixture: ComponentFixture<TritonLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TritonLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TritonLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
