import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertcodePage } from './insertcode.page';

describe('InsertcodePage', () => {
  let component: InsertcodePage;
  let fixture: ComponentFixture<InsertcodePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
