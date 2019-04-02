const { ApolloServer } = require('apollo-server');
const typeDefs  = require('./typeDefs');
const resolvers = require('./resolvers');
const moongose = require('mongoose');
const { findOrCreateUser } = require('./controllers/userController')
require('dotenv').config();

moongose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
})
.then(() => console.log('db connect'))
.catch((err) => console.log(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null
    try {
      authToken = req.headers.authorization
      if (authToken) {
        currentUser = await findOrCreateUser(authToken)
      }
    } catch (err) {
      console.log('unable to auth user', err)
    }
    return { currentUser }
  }
});

server.listen().then(({ url }) => {
  console.log(`server listening on ${url}`)
})