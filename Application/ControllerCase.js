const Model = require('../Domain/Case')
const { createObjects, searchObject, deleteObjects } = require('./Common/ObjectHandling')

module.exports = {
    createMany: async(req, res, next) => {
        // #swagger.tags = ['Read']
        try{
            req.body.components.forEach(async (e) => {
                let obj = await createObjects(e, Model, 'case')
                await obj.save();
            })

            return res.status(201).json({error: false, message: "Añadidos"})
        }
        catch(err) {
            console.log(err)
            return res.status(400).json({ error: true })
        }
    },

    get: async(req, res) => {
        let obj = await searchObject(req.query, Model)

        return res.status(200).json({ obj })
    },

    delete: async(req, res) => {
        var obj = await deleteObjects(Model, 'case')

        return res.status(200).json(obj)
    }
}