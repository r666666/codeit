import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {MeGQL, RegisterGQL} from 'src/generated/graphql';

@Component({
  selector: 'app-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegister implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private me : MeGQL,
    private register: RegisterGQL,
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
    this.register.mutate({ options: this.form.value }, {
      update: (cache, value) => {
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
