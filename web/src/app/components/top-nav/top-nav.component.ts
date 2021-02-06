import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { MeGQL, LogoutGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
  user: { id: number, username: string };
  querySubscription: Subscription;

  constructor(
    private me: MeGQL,
    private logout: LogoutGQL,
  ) {}

  ngOnInit(): void {
    this.querySubscription = this.me.watch().valueChanges.subscribe(({ data }) => {
      this.user = data.me;
    });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  handleLogout() {
    this.logout.mutate({}, {
      update: (cache, value) => {
        cache.writeQuery({
          query: this.me.document,
          data: { me: null }
        });
      }
    }).subscribe(value => {})
  }
}
