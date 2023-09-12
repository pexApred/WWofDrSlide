require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { InMemoryLRUCache } = require('apollo-server-caching');
const path = require('path');
const cors = require('cors');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./config/connection');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: {
    cache: new InMemoryLRUCache({ maxSize: 1000 })
  },
  context: ({ req }) => {
    // add the user to the context
    const userReq = authMiddleware({ req });
    return { user: userReq.user };
    // return {};
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client_wwofdrslide/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client_wwofdrslide/build/index.html'));
});

// catch all route
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client_wwofdrslide/build/index.html'));
// });

// app.use(routes);
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to start the server
startApolloServer();