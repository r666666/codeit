import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Apollo, gql } from "apollo-angular";

const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    register(options: {username: $username, password: $password}) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
    }
  }
`;

@Component({
  selector: 'app-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegister implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    this.apollo.mutate({
      mutation: REGISTER,
      variables: this.form.value
    }).subscribe();
  }
}
