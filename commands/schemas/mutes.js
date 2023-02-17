const mongoose = require("mongoose")

const mutes = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String
    },

    muteRu: {
        type: Array,
        required: true
    },
    startAt: {
        type: Date,
        require: true
    },
    endAt: {
        type: Date,
        require: true
    },
    reason: {
        type: Array
    },

});

module.exports = mongoose.model("mutes", mutes)