import { NgModule } from '@angular/core';
import { Router } from "@angular/router";

import { Apollo } from 'apollo-angular';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink, HttpLinkHandler } from 'apollo-angular/http';
import { onError } from '@apollo/client/link/error';

import { environment } from '../environments/environment';

@NgModule()

export class GraphQLModule {
  cache: InMemoryCache;
  link: HttpLinkHandler;
  errorLink: ApolloLink;

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private router: Router
  ) {
    this.cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: false,
              merge(existing = [], incoming: any[], field) {
                if (
                  !field.variables.limit ||
                  existing.every((val, index) => val.__ref === incoming[index].__ref)
                ) {
                  return [...incoming];
                }
                return [...existing, ...incoming];
              },
            }
          }
        }
      },
    });
    this.link = this.httpLink.create({
      uri: environment.serverAPI,
      withCredentials: true
    });

    this.errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({message}) => {
        });
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    this.apollo.create({
      link: this.errorLink.concat(this.link),
      cache: this.cache,
    } as any);
  }
}
