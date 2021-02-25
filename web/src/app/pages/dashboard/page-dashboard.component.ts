import { Component, OnInit } from '@angular/core';

import { QueryRef } from 'apollo-angular';

import { PostsGQL } from 'src/generated/graphql';
import { IPost } from '../../interfaces/post';

@Component({
  selector: 'app-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.scss']
})
export class PageDashboard implements OnInit {
  posts: IPost[];
  cursor: any;
  querySubscription: QueryRef<any>;

  constructor(
    private getPosts: PostsGQL,
  ) {
    this.querySubscription = this.getPosts.watch(
      { limit: 2 },
      // { fetchPolicy: 'network-only'}
    );

    this.querySubscription.valueChanges.subscribe(({ data }) => {
      this.posts = data.posts;
    });
  }

  ngOnInit() {
  }

  loadPosts() {
    this.querySubscription.fetchMore({
      variables: {
        limit: 2,
        cursor: this.posts[this.posts.length - 1].createdAt
      }
    });
  }
}
