const { Schema, model } = require('mongoose')

const Common = require('./Common')

var Case = Common.discriminator('Case', new Schema({
        type: {
            type: String,
            enum: ['ATX', 'Micro ATX', 'Mini ITX']
        }
    }, {id: false})
)

module.exports = model("Case")