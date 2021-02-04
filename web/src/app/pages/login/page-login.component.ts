import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Apollo } from "apollo-angular";
import { LoginGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLogin implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private login: LoginGQL,
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
    this.login.mutate({ options: this.form.value },
      { refetchQueries: [this.login.document.toString()]}).subscribe(
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
