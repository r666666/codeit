import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
  Int
} from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
import { Vote } from "../entities/Vote";

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@Resolver()
export class PostResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg('postId', () => Int) postId: number,
    @Arg('value', () => Int) value: number,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;
    const isUpvote = value !== -1;
    const vote = isUpvote ? 1 : -1;

    const upvote = await Vote.findOne({ where: { postId, userId } });
    
    // if user is already voted
    if (upvote && upvote.value !== vote) {
      await getConnection().transaction(async (tm) => {
        await tm.query(`
          update vote
          set value = $1
          where "postId" = $2 and "userId" = $3
        `, [vote, postId, userId]);

        await tm.query(`
          update post
          set points = points + $1
          where id = $2
        `, [2 * vote, postId]);
      });
    } else if (!upvote) {
      await getConnection().transaction(async (tm) => {
        await tm.query(`
          insert into vote ("userId", "postId", value)
          values ($1, $2, $3)
        `, [userId, postId, value]);

        await tm.query(`
          update post
          set points = points + $1
          where id = $2
        `, [vote, postId]);
      });
    }

    return true;
  }

  @Query(() => [Post])
  async posts(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<Post[]> {
    const realLimit = Math.min(50, limit);
    const replacements: any[] = [realLimit, req.session.userId];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const posts = await getConnection().query(`
      select p.*,
      json_build_object(
        'id', u.id,
        'username', u.username,
        'email', u.email,
        'createdAt', u."createdAt",
        'updatedAt', u."updatedAt"
      ) creator,
      ${
        req.session.userId
          ? '(select value from vote where "userId" = $2 and "postId" = p.id) "voteStatus"'
          : 'null as "voteStatus"'
      }
      from post p
      inner join public.user u on u.id = p."creatorId"
      ${cursor ? `where p."createdAt" < $3` : ""}
      order by p."createdAt" DESC
      limit $1
    `, replacements);

    return posts;
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    if (!req.session.userId) {
      throw new Error('not authenticated');
    }

    return Post.create({
      ...input,
      creatorId: req.session.userId
    }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      await Post.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    await Post.delete(id);
    return true;
  }
}
