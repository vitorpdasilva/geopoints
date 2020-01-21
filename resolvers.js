const { AuthenticationError } = require('apollo-server');
const Pin = require("./models/Pin");

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
  },
  Mutation: {
    createPin: authenticated(async (root, args, context) => {
      const newPin = await new Pin({
        ...args.input,
        author: context.currentUser._id,
      }).save()
      const pinAdded = await Pin.populate(newPin, "author");
      return pinAdded;
    })
  }
}