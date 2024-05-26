import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEnComponent } from './dialog-en.component';

describe('DialogEnComponent', () => {
  let component: DialogEnComponent;
  let fixture: ComponentFixture<DialogEnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEnComponent]
    });
    fixture = TestBed.createComponent(DialogEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
