const PcBuild = require('../Domain/PcBuild')

const Case = require('../Domain/Case')
const Cooler = require('../Domain/Cooler')
const CPU = require('../Domain/CPU')
const GPU = require('../Domain/GPU')
const Mobo = require('../Domain/Mobo')
const PSU = require('../Domain/PowerSupply')
const Ram = require('../Domain/Ram')

const { createValidator } = require('../Persistence/PcBuildValidator')

function checkIfValid(pc) {
    // Procesador y mobo
    if(pc.cpu.manufacturer != pc.mobo.compatibility) {
        console.group('Manufacturer')
        console.log(pc.cpu.manufacturer)
        console.log(pc.mobo.compatibility)
        console.groupEnd()

        return "El procesador seleccionado no es compatible con su motherboard";
    }

    // Mobo y ram
    else if(pc.mobo.ramSockets < pc.ram.length) {
        console.group('RamSockets')
        console.log(pc.mobo.ramSockets)
        console.log(pc.ram.length)
        console.groupEnd()

        return `Ha seleccionado ${pc.ram.length} sticks de ram para ${pc.mobo.ramSockets} sockets disponibles`
    }

    // Mobo y case
    else if(pc.mobo.type != pc.case.type) {
        console.group('Mobo')
        console.log(`Mobo: ${pc.mobo.type}`)
        console.log(`Case: ${pc.case.type}`)
        console.groupEnd()

        return `Una motherboard ${pc.mobo.type} no es compatible con un case ${pc.case.type}`
    }

    // Necesita gpu
    else if(pc.cpu.integratedGraphics == false)
        return "Necesita una tarjeta gráfica dedicada para su sistema"

    // Fuente
    var wattage = pc.case.powerConsumption + pc.cooler.powerConsumption + pc.cpu.powerConsumption + pc.gpu.powerConsumption
        + pc.mobo.powerConsumption + pc.ram.powerConsumption

    if(wattage >= pc.psu.capacity)
        return `El voltaje de su fuente es menor que su consumo total. Consumo total: ${wattage} > Voltaje fuente: ${pc.psu.capacity}`

    else
        return "OK"
}

module.exports = {
    create: async(req, res) => {
        try{
            await createValidator(req.body)

            var pccase = await Case.findOne({_id: req.body.case})
            var cooler = await Cooler.findOne({_id: req.body.cooler})
            var cpu = await CPU.findOne({_id: req.body.cpu})
            var gpu = await GPU.findOne({_id: req.body.gpu})
            var mobo = await Mobo.findOne({_id: req.body.mobo})
            var psu = await PSU.findOne({_id: req.body.psu})
            var ram = req.body.ram

            if(cooler == null && cpu != null)
                if(cpu.manufacturer == 'Intel')
                    cooler = await Cooler.findOne({name: 'Intel Stock'})
                else
                    cooler = await Cooler.findOne({name: 'AMD Stock'})

            var pc = {
                case: pccase,
                cooler,
                cpu,
                gpu,
                mobo,
                psu,
                ram
            }

            var validStatus = checkIfValid(pc)

            if(validStatus !== "OK")
                throw {error: true, message: validStatus}

            var pc = new PcBuild({
                owner: req.user._id,
                name: req.body.name,

                case: pccase._id,
                cooler: cooler._id,
                cpu: cpu._id,
                gpu: gpu._id,
                mobo: mobo._id,
                psu: psu._id,
                ram: req.body.ram
            })

            await pc.save()

            return res.status(200).json({error: false, message: "Build guardado"})
        }
        catch(err) {
            console.log(err)
            return res.status(401).send(JSON.stringify(err))
        }
    },

    getPcBuilds: async(req, res) => {
        var builds = await PcBuild.find({owner: req.user._id})

        return res.status(200).json(builds)
    },

    getSpecificBuild: async(req, res) => {
        var build = await PcBuild.findOne({_id: req.query._id})

        if(build == null)
            return res.status(404).json({error: true, message: "Build no encontrado"})

        var pc = {
            _id: build._id,
            name: build.name,

            case: await Case.findOne({_id: build.case}).select('-__v -name_lower -_component -_id'),
            cooler: await Cooler.findOne({_id: build.cooler}).select('-__v -name_lower -_component -_id'),
            cpu: await CPU.findOne({_id: build.cpu}).select('-__v -name_lower -_component -_id'),
            gpu: await GPU.findOne({_id: build.gpu}).select('-__v -name_lower -_component -_id'),
            mobo: await Mobo.findOne({_id: build.mobo}).select('-__v -name_lower -_component -_id'),
            psu: await PSU.findOne({_id: build.psu}).select('-__v -name_lower -_component -_id'),
            ram: await build.ram.map(async(e) => {
                return await Ram.findOne({_id: e}.select('-__v -name_lower -_component -_id'))
            })
        }

        return res.status(200).json(pc)
    },

    deleteBuild: async(req, res) => {
        var deleteInfo = await PcBuild.findOneAndDelete({_id: req.body._id})

        return res.status(200).json(deleteInfo)
        
    }
}