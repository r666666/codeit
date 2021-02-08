import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginGQL } from 'src/generated/graphql';
import { MeGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLogin implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private login: LoginGQL,
    private me : MeGQL,
    route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async submitForm() {
    this.form.value.email = '';
    this.login.mutate({ options: this.form.value }, {
      update: (cache, value) => {
        if (value.data?.login.user) {
          cache.writeQuery({
            query: this.me.document,
            data: { me: value.data.login.user }
          });
        }
      }
    }).subscribe(
      value => {
        if (value.data?.login.errors) {
          console.log(value.data.login.errors);
        } else if (value.data?.login.user) {
          this.router.navigate(['/']);
        }
      }
    );
  }
}
