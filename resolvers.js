const { AuthenticationError } = require('apollo-server');

const user = {
  _id: '1',
  name: 'Vitor',
  email: 'vitorboccio@gmail.com',
  picture: 'https://cloudinary.com/asdasda',
}

const authenticated = next => (root, args, ctx, info) => {
  console.log('resolver', ctx);
  if (!ctx.currentUser) {
    throw new AuthenticationError('you must bee logged in');
  }
  return next(root, args, ctx, info);
}

module.exports = {
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser)
  }
}