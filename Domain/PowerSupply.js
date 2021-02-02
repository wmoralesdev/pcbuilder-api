const { Schema, model } = require('mongoose')

const Common = require('./Common')

var Psu = Common.discriminator('Psu', new Schema({
    capacity: Number,
}, {id: false})
)

module.exports = model("Psu")