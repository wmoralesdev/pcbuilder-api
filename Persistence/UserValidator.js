const joi = require('joi')

const Validator = {
    registerValidator: data => {
        let validationSchema = new joi.object({
            username: joi.string()
                .required()
                .min(6),
            email: joi.string()
                .min(6)
                .email()
                .required(),
            password: joi.string()
                .min(6)
                .alphanum()
                .required()
        })

        return validationSchema.validateAsync(data)
    },
    loginValidator: data => {
        let validationSchema = new joi.object({
            username: joi.string()
                .required()
                .min(6),
            password: joi.string()
                .min(6)
                .alphanum()
                .required()
        })

        return validationSchema.validateAsync(data)
    }
}

module.exports = Validator