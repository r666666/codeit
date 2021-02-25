import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { environment } from '../environments/environment';

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache({
            typePolicies: {
              Query: {
                fields: {
                  posts: {
                    keyArgs: ['type'],
                    merge(existing = [], incoming, {
                      args: {limit, cursor}
                    }) {
                      if (limit) {
                        return [...existing, ...incoming];
                      }
                      return existing;
                    }
                  }
                }
              }
            }
          }),
          link: httpLink.create({
            uri: environment.serverAPI,
            withCredentials: true
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
})

export class ApolloModule {}
