import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayIComponent } from './may-i.component';

describe('MayIComponent', () => {
  let component: MayIComponent;
  let fixture: ComponentFixture<MayIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
