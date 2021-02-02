const { Schema, model } = require('mongoose')

const PcBuild = Schema({
    owner: String,
    name: String,

    case: String,
    cooler: String,
    cpu: String,
    gpu: String,
    mobo: String,
    psu: String,
    ram: [String]
})

module.exports = model("PcBuild", PcBuild)