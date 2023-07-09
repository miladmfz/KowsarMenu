import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBasketitemComponent } from './order-basketitem.component';

describe('OrderBasketitemComponent', () => {
  let component: OrderBasketitemComponent;
  let fixture: ComponentFixture<OrderBasketitemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderBasketitemComponent]
    });
    fixture = TestBed.createComponent(OrderBasketitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
