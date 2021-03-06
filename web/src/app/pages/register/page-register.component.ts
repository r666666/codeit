import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MeGQL, RegisterGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegister implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private register: RegisterGQL,
    private router: Router,
    private me: MeGQL,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async submitForm() {
    this.register.mutate({ options: this.form.value }, {
      update: (
        cache,
        value
      ) => {
        if (value.data?.register.user) {
          cache.writeQuery({
            query: this.me.document,
            data: { me: value.data.register.user }
          });
        }
      }
    }).subscribe(
      value => {
        if (value.data?.register.errors) {
          console.log(value.data.register.errors);
        } else if (value.data?.register.user) {
          this.router.navigate(['/']);
        }
      }
    );
  }
}
