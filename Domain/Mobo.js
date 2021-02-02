const { Schema, model } = require('mongoose')

const Common = require('./Common')

var Mobo = Common.discriminator('Mobo', new Schema({
        type: {
            type: String,
            enum: ['ATX', 'Micro ATX', 'Mini ITX']
        },
        compatibility: String,
        ramSockets: Number,
        pciePorts: Number,
    }, {id: false})
)

module.exports = model("Mobo")