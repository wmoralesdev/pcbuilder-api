const { Schema, model } = require('mongoose')

var Common = Schema({
    name: String,
    name_lower: {
        type: String,
        default: function() {
            return this.name.toLowerCase()
        }
    },
    manufacturer: String,
    productionYear: Number,
    price: {
        type: Number,
        set: v => v,
        get: v => v / 100,
    },
    powerConsumption: Number
}, { discriminatorKey: '_component', id: false })

Common.set('toObject', { getters: true, setters: true })
Common.set('toJSON', { getters: true, setters: true })

module.exports = model("Common", Common)