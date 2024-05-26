import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEnComponent } from './item-en.component';

describe('ItemEnComponent', () => {
  let component: ItemEnComponent;
  let fixture: ComponentFixture<ItemEnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemEnComponent]
    });
    fixture = TestBed.createComponent(ItemEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
