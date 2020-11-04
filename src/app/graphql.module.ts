import {NgModule} from '@angular/core';
import {ApolloModule,Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { HttpClientModule } from '@angular/common/http';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

// const uri = 'https://atencionmedic.herokuapp.com/graphql';

const uri = 'http//localhost:3000/graphql';

export function createApollo(httpLink: HttpLink) {
  const token = localStorage.getItem('token');
  // const basic = setContext((operation, context) => ({
  //   headers: {
  //     Accept: 'charset=utf-8'
  //   }
  // }));

  // Get the authentication token from local storage if it exists
  const auth = setContext((operation, context) => {
    // const token = localStorage.getItem('token');
    // if(!token) {
      // alert(localStorage.getItem('token'))
    // }
    // alert(localStorage.getItem('token'))
    if (token)
    return {  
              headers: { authorization: `Bearer ${token}`} 
        }
  });
  // const http = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  // uri:"wss://atencionmedic.herokuapp.com/graphql",

  const http = ApolloLink.from([auth, httpLink.create({ uri })]);
  const ws = new WebSocketLink({
    uri:"wss://localhost:3000/graphql",
    options: {
      reconnect: true,
      connectionParams: {
        authorization: `Bearer ${token}`,
      },
      lazy:true,
      timeout:60000
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
  exports: [ApolloModule, 
            HttpLinkModule, 
            HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
