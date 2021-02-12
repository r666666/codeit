import {Component, Input, OnInit} from '@angular/core';

import { UserGQL } from '../../../generated/graphql';
import { IPost } from '../../interfaces/post';
import { IUser } from "../../interfaces/user";

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {
  user: IUser;

  @Input() post: IPost;

  constructor(
    private getUser: UserGQL
  ) { }

  ngOnInit(): void {
    this.getUser.fetch({
      id: this.post.creatorId
    }).subscribe(value => {
      this.user = value.data.user;
    });
  }

}
