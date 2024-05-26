import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFaComponent } from './menu-fa.component';

describe('MenuFaComponent', () => {
  let component: MenuFaComponent;
  let fixture: ComponentFixture<MenuFaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuFaComponent]
    });
    fixture = TestBed.createComponent(MenuFaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
