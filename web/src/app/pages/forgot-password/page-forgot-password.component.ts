import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ForgotPasswordGQL } from '../../../generated/graphql';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './page-forgot-password.component.html',
  styleUrls: ['./page-forgot-password.component.scss']
})
export class PageForgotPassword implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private forgotPassword: ForgotPasswordGQL,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.required]
    });
  }

  submitForm() {
    this.forgotPassword.mutate({
      email: this.form.value.email
    }).subscribe();
  }
}
