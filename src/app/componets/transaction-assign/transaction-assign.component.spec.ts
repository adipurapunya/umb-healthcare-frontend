import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAssignComponent } from './transaction-assign.component';

describe('TransactionAssignComponent', () => {
  let component: TransactionAssignComponent;
  let fixture: ComponentFixture<TransactionAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
