import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// const uri = 'https://atencionmedic.herokuapp.com/graphql';

export function createApollo(httpLink: HttpLink) {

  const http = httpLink.create({
    uri:'https://atencionmedic.herokuapp.com/graphql',
    withCredentials:true
  });

  const ws = new WebSocketLink({
    uri:"ws://atencionmedic.herokuapp.com/graphql",
    options: {
      reconnect: true
    }
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } : any = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    ws,
    http,
  );

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
