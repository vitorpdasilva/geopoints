const moogoose = require('moongose');

const PinSchema = new moongose.Schema({
  title: String,
  content: String,
  image: String,
  latitude: Number,
  longitude: Number,
  author: { type: moongose.Schema.ObjectId, ref: "User" },
  comments: [
    {
      text: String,
      createdAt: { type: Date, default: Date.now},
      author: { type: moongose.Schema.ObjectId, ref: "User" }
    }
  ]
}, { timestamps: true });

modules.exports = moogoose.model('Pin', PinSchema);