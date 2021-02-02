const joi = require('joi')

const Validator = {
    createValidator: data => {
        let validationSchema = new joi.object({
            name: joi.string(),
            owner: joi.string(),
            case: joi.string(),
            cooler: joi.string(),
            cpu: joi.string(),
            gpu: joi.string(),
            mobo: joi.string(),
            psu: joi.string(),
            ram: joi.array(),
            completed: joi.bool()
        })

        return validationSchema.validateAsync(data)
    }
}

module.exports = Validator