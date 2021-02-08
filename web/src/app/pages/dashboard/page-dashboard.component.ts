import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { PostsGQL } from 'src/generated/graphql';
import { IPost } from '../../interfaces/post';

@Component({
  selector: 'app-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.sass']
})
export class PageDashboard implements OnInit, OnDestroy {
  posts: IPost[];
  querySubscription: Subscription;

  constructor(
    private getPosts: PostsGQL
  ) {}

  ngOnInit(): void {
    this.querySubscription = this.getPosts.watch().valueChanges.subscribe(({ data }) => {
      this.posts = data.posts;
    });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
