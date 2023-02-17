const { Schema, model } = require("mongoose");

const schema = Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },

  blocked: {
    type: Boolean,
    default: false
  }
});

module.exports = model("user", schema);
