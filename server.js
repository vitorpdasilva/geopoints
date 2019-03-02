const { ApolloServer } = require('apollo-server');
const typeDefs  = require('./typeDefs');
const resolvers = require('./resolvers');
const moongose = require('mongoose');
require('dotenv').config();

moongose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
})
.then(() => console.log('db connect'))
.catch((err) => console.log(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`server listening on ${url}`)
})