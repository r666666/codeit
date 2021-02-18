import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { __prod__, SERVER_PORT, USER_COOKIE, WEB_URL } from './constants';
import { PostResolver } from './resolvers/post';
import { UserResolver } from "./resolvers/user";
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from "cors";
import { createConnection } from 'typeorm';
import { User } from './entities/User';
import { Post } from './entities/Post';
import { Vote } from './entities/Vote';

const main = async () => {
  await createConnection({
    type: 'postgres',
    database: 'codeit',
    username: 'postgres',
    password: 'admin',
    logging: true,
    synchronize: true,
    entities: [Post, User, Vote]
  });

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: WEB_URL,
      credentials: true
    })
  )

  app.use(
    session({
      name: USER_COOKIE,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__
      },
      saveUninitialized: false,
      secret: 'randomStringValue',
      resave: false
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res}) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false
  });

  app.listen(SERVER_PORT, () => {
    console.log(`server started, listening ${SERVER_PORT} port`);
  })
}

main().catch((err) => {
  console.log(err);
});
