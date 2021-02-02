const { Schema, model } = require('mongoose')

const Common = require('./Common')

var Cpu = Common.discriminator('Cpu', new Schema({
        frequency: String,
        cores: Number,
        threads: Number,
        integratedGpu: Boolean,
    }, {id: false})
)

module.exports = model("Cpu")