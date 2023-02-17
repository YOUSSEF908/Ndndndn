const mongoose = require("mongoose")

const sub = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    subs: {
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
    }

});

module.exports = mongoose.model("sub", sub)