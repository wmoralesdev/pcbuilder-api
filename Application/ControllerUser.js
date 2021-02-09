const { hash, compare } = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Domain/User')
const { registerValidator, loginValidator } = require('../Persistence/UserValidator')

const Controller = {
    register: async (req, res) => {
        try{
            let isUnique = await User.find({ $or: [{ username: req.body.username }, {email: req.body.email}] })

            if(isUnique.length > 0)
                throw { code: 400, body: { error: true, message: "Nombre de usuario o correo en uso" } }

            let hashedPassword = await hash(req.body.password, 10)

            let user = new User({
                username: req.body.username,
                email: req.body.username,
                password: hashedPassword
            })

            await user.save()

            return res.status(201).json({error: false, message: "Success"})
        }
        catch(err) {
            return err.details == null ? res.status(err.code).json(err.body) : 
                res.status(400).json({error: true, message: err.details[0].message})
        }
    },

    login: async(req, res) => {
        try{
            await loginValidator(req.body)

            let userToLog = await User.findOne({username: req.body.username})
            if(!userToLog)
                throw {code: 404, error: true, message: "Nombre de usuario no encontrado"}

            let validCredentials = await compare(req.body.password, userToLog.password)
            if(!validCredentials)
                throw {code: 401, error: true, message: "Wrong password"}

            const token = jwt.sign({_id: userToLog._id, username: userToLog.username}, process.env.TOKEN_KEY)

            return res.status(200).json({error: false, message: "Success", token: token})
        }
        catch(err) {
            return err.details == null ? res.status(err.code).json(err.body) : 
                res.status(400).json({error: true, message: err.details[0].message})
        }
    }
}

module.exports = Controller