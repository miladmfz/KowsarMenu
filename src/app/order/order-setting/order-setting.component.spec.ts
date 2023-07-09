import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSettingComponent } from './order-setting.component';

describe('OrderSettingComponent', () => {
  let component: OrderSettingComponent;
  let fixture: ComponentFixture<OrderSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSettingComponent]
    });
    fixture = TestBed.createComponent(OrderSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
