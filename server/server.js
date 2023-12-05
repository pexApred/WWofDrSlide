const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDatabase = require('./config/database');
const routes = require('./routes/routes');
const { typeDefs, resolvers } = require('./schemas');
const authMiddleware = require('./utils/authMiddleware');
const config = require('./config/config');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    return { user: req.user, res };
  },
});

const allowedOrigins = ['http://localhost:3000', 'https://studio.apollographql.com', 'https://wwofdrslide-0072af6d23f0.herokuapp.com/'];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(authMiddleware);

app.use(routes);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client_wwofdrslide/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client_wwofdrslide/build/index.html'));
  });
}

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app, cors: false });

  connectDatabase();

  app.listen(config.PORT, () => {
    console.log(`Server listening on localhost:${config.PORT}`);
  })
};
console.log("Starting Apollo Server...");

startApolloServer();
