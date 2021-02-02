const { Schema, model } = require('mongoose')

const Common = require('./Common')

var Ram = Common.discriminator('Ram', new Schema({
        frequency: String,
        capacity: Number,
        type: String,
    }, {id: false})
)

module.exports = model("Ram")