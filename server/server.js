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

const allowedOrigins = [
  'http://localhost:3000', 
  'https://studio.apollographql.com', 
  'https://main--effervescent-mochi-51d9a5.netlify.app/', 
  'https://thewonderfulworldofdrslide.com', 
  'https://www.thewonderfulworldofdrslide.com', 
  'https://wwofdrslide-0072af6d23f0.herokuapp.com/'];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization' 
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(authMiddleware);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

app.use(routes);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client_wwofdrslide/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client_wwofdrslide/build/index.html'));
  });
}

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql',cors: false });

  connectDatabase();

  app.listen(config.PORT, () => {
    console.log(`Server listening on localhost:${config.PORT}`);
  })
};

startApolloServer();
