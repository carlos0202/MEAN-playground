import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstComponentContainerComponent } from './first-component-container.component';

describe('FirstComponentContainerComponent', () => {
  let component: FirstComponentContainerComponent;
  let fixture: ComponentFixture<FirstComponentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstComponentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstComponentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
