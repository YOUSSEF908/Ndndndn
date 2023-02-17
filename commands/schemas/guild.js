const mongoose = require('mongoose');
const GuildSchema = new mongoose.Schema({
  GuildId: { type: String }
  
})

module.exports = mongoose.model('guild', GuildSchema);
