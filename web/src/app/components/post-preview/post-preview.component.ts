import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { IPost } from '../../interfaces/post';
import { DeletePostGQL, MeGQL } from '../../../generated/graphql';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {
  user: IUser;
  querySubscription: Subscription;

  @Input() post: IPost;

  constructor(
    private deletePost: DeletePostGQL,
    private router: Router,
    private me: MeGQL
  ) {
    this.querySubscription = this.me.watch().valueChanges.subscribe(({ data }) => {
      this.user = data.me;
    });
  }

  ngOnInit() {
  }

  handleDelete(id: number) {
    this.deletePost.mutate({ id: id }, {
        update(cache, data) {
          
        }
      }
    ).subscribe(data => {
      console.log(data);
    });
  }

  handleEdit(id: number) {
    this.router.navigate(['/edit-post/' + id]);
  }
}
