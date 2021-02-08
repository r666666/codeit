import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChangePasswordGQL, MeGQL } from "../../../generated/graphql";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class PageChangePassword implements OnInit {
  token: string;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private changePassword: ChangePasswordGQL,
    private me : MeGQL,
    private router: Router,
  ) {
    this.route.params.subscribe(params => {
      this.token = params.token;
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      password: ['', Validators.required]
    });
  }

  submitForm() {
    this.changePassword.mutate({
      newPassword: this.form.value.password,
      token: this.token
    }, {
      update: (cache, value) => {
        if (value.data?.changePassword.user) {
          cache.writeQuery({
            query: this.me.document,
            data: { me: value.data.changePassword.user }
          });
        }
      }
    }).subscribe(value => {
      if (value.data?.changePassword.errors) {
        console.log(value.data.changePassword.errors);
      } else if (value.data?.changePassword.user) {
        this.router.navigate(['/']);
      }
    })
  }
}
