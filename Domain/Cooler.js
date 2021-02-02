const { Schema, model } = require('mongoose')

const Common = require('./Common')

var Cooler = Common.discriminator('Cooler', new Schema({
        type: {
            type: String,
            enum: ['Water cooled', 'Stock', 'Custom water cooled']
        }
    }, {id: false})
)

module.exports = model("Cooler")