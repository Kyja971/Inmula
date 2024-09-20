import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyApplicationStatusPage } from './my-application-status.page';

describe('MyApplicationStatusPage', () => {
  let component: MyApplicationStatusPage;
  let fixture: ComponentFixture<MyApplicationStatusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApplicationStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
