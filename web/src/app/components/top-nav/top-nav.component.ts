import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { MeGQL, LogoutGQL } from 'src/generated/graphql';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
  user: IUser;
  querySubscription: Subscription;

  constructor(
    private me: MeGQL,
    private logout: LogoutGQL,
  ) {
    this.querySubscription = this.me.watch().valueChanges.subscribe(({ data }) => {
      this.user = data.me;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
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
