const { AuthenticationError, PubSub } = require('apollo-server');
const Pin = require("./models/Pin");

const pubsub = new PubSub();
const PIN_ADDED = 'PIN_ADDED';
const PIN_DELETED = 'PIN_DELETED';
const PIN_UPDATED = 'PIN_UPDATED';

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError('you must bee logged in');
  }
  return next(root, args, ctx, info);
}

module.exports = {
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser),
    getPins: async (root, args, ctx) => {
      const pins = await Pin.find({}).populate('author').populate('comments.author');
      return pins;
    }
  },
  Mutation: {
    createPin: authenticated(async (root, args, context) => {
      const newPin = await new Pin({
        ...args.input,
        author: context.currentUser._id,
      }).save()
      const pinAdded = await Pin.populate(newPin, "author");
      pubsub.publish(PIN_ADDED, { pinAdded });
      return pinAdded;
    }),
    deletePin: authenticated(async (root, args, context) => {
      console.log({ args })
      const pinDeleted = await Pin.findOneAndDelete({ id: args.pinId }).exec();
      return pinDeleted;
    }),
    createComment: authenticated(async (root, args, context) => {
      const newComment = { text: args.text, author: context.currentUser._id };
      const pinUpdated = await Pin.findOneAndUpdate(
        { _id: args.pinId }, 
        { $push: { comments: newComment } },
        { new: true },
      ).populate('author').populate('comments.author');
      pubsub.publish(PIN_UPDATED, { pinUpdated });
      return pinUpdated
    })
  },
  Subscription: {
    pinAdded: {
      subscribe: () => pubsub.asyncIterator(PIN_ADDED)
    },
    pinDeleted: {
      subscribe: () => pubsub.asyncIterator(PIN_DELETED)
    },
    pinUpdated: {
      subscribe: () => pubsub.asyncIterator(PIN_UPDATED)
    }
  }
}