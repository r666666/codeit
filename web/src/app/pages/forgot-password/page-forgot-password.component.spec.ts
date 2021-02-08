import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageForgotPassword } from './page-forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: PageForgotPassword;
  let fixture: ComponentFixture<PageForgotPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageForgotPassword ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageForgotPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
