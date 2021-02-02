const { Schema, model } = require('mongoose')

const Common = require('./Common')

var Gpu = Common.discriminator('Gpu', new Schema({
        vram: Number,
        fans: Number,
    }, {id: false})
)

module.exports = model("Gpu")