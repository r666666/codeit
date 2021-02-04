import { Component, OnInit } from '@angular/core';

import {Apollo, gql} from "apollo-angular";
import { MeGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  user: { id: number, username: string };

  constructor(
    private apollo: Apollo,
    private me: MeGQL,
  ) {}

  ngOnInit(): void {
    this.me.fetch().subscribe(value => {
      this.user = value.data.me;
      console.log(value);
    });
  }
}
