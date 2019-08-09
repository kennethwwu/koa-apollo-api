import Koa from 'koa';
import { ApolloServer, gql } from 'apollo-server-koa';
import _ from 'lodash';

const { actresses } = require('./data.json');

const typeDefs = gql`
  type Actress {
    id: ID
    name: String
  }

  type Query {
    actresses: [Actress]
    actress(id: ID!): Actress!
  }
`;

const resolvers = {
    Query: {
        actresses: () => actresses,
        actress: ( parent:any, { id }:{id:any} ) => {
            return _.find(actresses, {'id': Number(id) });
        }
    },
};

const app = new Koa();

const corsOptions = {
    origin:  () => '*',
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.applyMiddleware({ app, path:'/api', cors: corsOptions})

app.listen(4000, () => {
    console.log('listening to port 4000!');
});