const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  gid: { type: String },
  user: { type: String },
  content: { type: Array },


  
})

module.exports = mongoose.model('warns', UserSchema);
