const mongoose = require('moongoose');

const UserSchema = new moongose.Schema({
  name: String,
  email: String,
  picture: String,
});

modules.exports = moongose.model("User", UserSchema);