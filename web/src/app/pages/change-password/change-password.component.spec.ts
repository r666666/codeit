import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageChangePassword } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: PageChangePassword;
  let fixture: ComponentFixture<PageChangePassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageChangePassword ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageChangePassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
