import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbiWrapperComponent } from './abi-wrapper.component';

describe('AbiWrapperComponent', () => {
  let component: AbiWrapperComponent;
  let fixture: ComponentFixture<AbiWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbiWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbiWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
