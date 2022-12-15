const mongoose = require('mongoose');

const todo = new mongoose.Schema({
    task:{
        type: String,
        required: true,
        trim: true,
    }
},{ timestamps: true })

module.exports = mongoose.model("Todo", todo);