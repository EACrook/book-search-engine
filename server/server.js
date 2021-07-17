const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./schemas');

const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  
  await server.start()

  server.applyMiddleware({ app })

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(routes);

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
  
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
      // if we're in production, serve client/build as static assets
      if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
      }
    });
  });
}

startApolloServer();