import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { CreatePostGQL, MeGQL, PostsGQL } from '../../../generated/graphql';
import { IUser } from "../../interfaces/user";

@Component({
  selector: 'app-create-post',
  templateUrl: './page-create-post.component.html',
  styleUrls: ['./page-create-post.component.scss']
})
export class PageCreatePost implements OnInit {
  form: FormGroup;
  user: IUser;

  constructor(
    private createPost: CreatePostGQL,
    private fb: FormBuilder,
    private router: Router,
    private me: MeGQL,
    private posts: PostsGQL
  ) { }

  ngOnInit() {
    this.initForm();
    this.me.fetch().subscribe(value => {
      if (!value.data.me) {
        this.router.navigate(['/login']);
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  async submitForm() {
    this.createPost.mutate(
      { input: this.form.value }, {
        update: (cache, value) => {
          cache.writeQuery({
            query: this.posts.document,
            data: { posts: [] }
          });
        }
      }).subscribe(
      value => {
        this.router.navigate(['/']);
      }
    );
  }
}
