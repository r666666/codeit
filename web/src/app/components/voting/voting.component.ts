import { Component, Input, OnInit } from '@angular/core';

import { IPost } from 'src/app/interfaces/post';
import { PostsGQL, VoteGQL } from '../../../generated/graphql';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {
  @Input() post: IPost;

  constructor(
    private vote: VoteGQL,
    private posts: PostsGQL
  ) { }

  ngOnInit() {
  }

  upvote() {
    this.handleVote(1);
  }

  downvote() {
    this.handleVote(-1);
  }

  async handleVote(vote: number) {
    this.vote.mutate({
      postId: this.post.id,
      value: vote
    }, {
      update: (cache, value) => {
        const posts: any = cache.readQuery({
          query: this.posts.document,
        });

        const newPosts = posts.posts.map(p => {
          if (p.id === this.post.id) {
            let point = p.points;
            return { ...p, points: point += vote, voteStatus: vote };
          }
          return p;
        });

        cache.writeQuery({
          query: this.posts.document,
          data: { posts: newPosts },
        });
      }
    }).subscribe();
  }
}
