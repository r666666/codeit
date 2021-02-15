import { Component, OnInit, OnDestroy } from '@angular/core';

import { Apollo, QueryRef } from 'apollo-angular';

import { PostsGQL } from 'src/generated/graphql';
import { IPost } from '../../interfaces/post';
import {InMemoryCache} from '@apollo/client/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.scss']
})
export class PageDashboard implements OnInit, OnDestroy {
  posts: IPost[];
  cursor: any;
  querySubscription: QueryRef<any>;;
  cache: InMemoryCache;

  constructor(
    private getPosts: PostsGQL,
    private apollo: Apollo
  ) {
    this.posts = [];
    this.cache = new InMemoryCache();
  }

  ngOnInit() {
    this.querySubscription = this.getPosts.watch({ limit: 2 });

    this.querySubscription.valueChanges.subscribe(({ data }) => {
      this.posts = data.posts;
    });
  }

  ngOnDestroy() {
    this.apollo.client.resetStore();
  } 

  loadPosts() {
    this.querySubscription.fetchMore({
      variables: {
        limit: 2,
        cursor: this.posts[this.posts.length-1].createdAt
      }
    });
  }
}