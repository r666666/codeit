import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UpdatePostGQL, PostGQL, MeGQL } from '../../../generated/graphql';
import { IPost } from 'src/app/interfaces/post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class PageEditPost implements OnInit {
  id: number;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private updatePost: UpdatePostGQL,
    private getPost: PostGQL,
    private fb: FormBuilder,
  ) {

    this.route.params.subscribe(params => {
      this.id = parseInt(params.id);
    });
    this.getPost.fetch({ id: this.id }).subscribe(data => {
      this.initForm(data.data.post);
    })
  }

  ngOnInit() {
  }

  initForm(post: IPost) {
    this.form = this.fb.group({
      title: [post.title, Validators.required],
      text: [post.text, Validators.required]
    });
  }

  async submitForm() {
    this.updatePost.mutate({
      id: this.id,
      title: this.form.value.title,
      text: this.form.value.text
    }).subscribe(data => {
      console.log(data);
    })
  }
}
