import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabAuthPage } from './tab-auth.page';

describe('TabAuthPage', () => {
  let component: TabAuthPage;
  let fixture: ComponentFixture<TabAuthPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
