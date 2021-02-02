const mongoose = require('mongoose')

module.exports = async function() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log(`Conectado a la BD`)
    }
    catch(err) {
        console.log('No se pudo conectar a la BD')
        console.log(err)
        process.exit()
    }
}