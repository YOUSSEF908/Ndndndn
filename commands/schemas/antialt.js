const mongoose = require("mongoose")

const altdetect = new mongoose.Schema({
   
    guildID: {type: String,
    required: true,
    unique: true},
      altDays: {type: String, default: 7},
      allowedAlts: {type: Array, default: []},
      altAction: {type: String, default: 'none'},
      altToggle: {type: String, default: false},
      notifier: {type: Boolean, default: false}
});

 module.exports = mongoose.model("altDetector", altdetect)