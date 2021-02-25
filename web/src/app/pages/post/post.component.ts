import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPost } from 'src/app/interfaces/post';
import { PostGQL } from '../../../generated/graphql';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PagePost implements OnInit {
  id: number;
  post: IPost;

  constructor(
    private route: ActivatedRoute,
    private getPost: PostGQL,
  ) {
    this.route.params.subscribe(params => {
      this.id = parseInt(params.id, 10);
    });
    this.getPost.fetch({ id: this.id }).subscribe(data => {
      this.post = data.data.post;
    });
  }

  ngOnInit() {
  }
}
