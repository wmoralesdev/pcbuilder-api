const joi = require('joi')

const Validator = {
    commonValidation: data => {
        let validationSchema = new joi.object({
            name: joi.string()
                .required()
                .min(3),
            manufacturer: joi.string()
                .required()
                .min(3),
            productionYear: joi.number()
                .required()
                .min(1900),
            price: joi.number()
                .required(),
            powerConsumption: joi.number()
        })

        return validationSchema.validateAsync(data)
    },

    cpuValidation: data => {
        let validationSchema = new joi.object({
            frequency: joi.string()
                .required()
                .min(3),
            cores: joi.number()
                .required(),
            threads: joi.number()
                .required(),
            integratedGpu: joi.bool()
                .required()
        })

        return validationSchema.validateAsync(data)
    }
}

module.exports = Validator