async function createObjects(e, creator, typeOf) {
    // #swagger.tags = ['Create/Delete']
    switch (typeOf) {
        case 'case':
            return new creator({
                type: e.type,
                
                name: e.name,
                manufacturer: e.manufacturer,
                productionYear: e.productionYear,
                powerConsumption: e.powerConsumption || 0,
                price: e.price
            })
            break;

        case 'cooler':
            return new creator({
                type: e.type,
                
                name: e.name,
                manufacturer: e.manufacturer,
                productionYear: e.productionYear,
                price: e.price,
                powerConsumption: e.powerConsumption || 0,
            })
            break;

        case 'cpu':
            return new creator({
                frequency: e.frequency,
                cores: e.cores,
                threads: e.threads,
                integratedGpu: e.integratedGpu,

                name: e.name,
                manufacturer: e.manufacturer,
                productionYear: e.productionYear,
                price: e.price,
                powerConsumption: e.powerConsumption || 0,
            })
            break;

        case 'gpu':
            return new creator({
                vram: e.vram,
                fans: e.fans,

                name: e.name,
                manufacturer: e.manufacturer,
                productionYear: e.productionYear,
                price: e.price,
                powerConsumption: e.powerConsumption || 0,
            })
            break;

        case 'mobo':
            return new creator({
                type: e.type,
                compatibility: e.compatibility,
                ramSockets: e.ramSockets,
                pciePorts: e.pciePorts,

                name: e.name,
                manufacturer: e.manufacturer,
                productionYear: e.productionYear,
                price: e.price,
                powerConsumption: e.powerConsumption || 0,
            })
            
            break;

        case 'psu':
            return new creator({
                capacity: e.capacity,

                name: e.name,
                manufacturer: e.manufacturer,
                productionYear: e.productionYear,
                price: e.price,
                powerConsumption: e.powerConsumption || 0,
            })
            break;

        case 'ram':
            return new creator({
                frequency: e.frequency,
                capacity: e.capacity,
                type: e.type,

                name: e.name,
                manufacturer: e.manufacturer,
                productionYear: e.productionYear,
                price: e.price,
                powerConsumption: e.powerConsumption || 0,
            })
            break;

        default:
            break;
    }
}

async function searchObject({ page = 1, limit = 12, search }, searcher) {
    // #swagger.tags = ['Query']
    var objects = []

    if(search != null)
        // objects = await searcher.find({ name_lower: /search/i }).select('-__v -name_lower')
        objects = await searcher.aggregate(
            [
                // Match first to reduce documents to those where the array contains the match
                { "$match": {
                    "name_lower": { "$regex": search, "$options": "i" }
                }},
        
                // Unwind to "de-normalize" the document per array element
                { "$unwind": "$name_lower" },
        
                // Now filter those document for the elements that match
                { "$match": {
                    "name_lower": { "$regex": search, "$options": "i" }
                }}
            ])
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()
    else
        objects = await searcher.find().select('-__v -name_lower')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

    const count = await searcher.countDocuments()
            
    return {
        pages: Math.ceil(count / limit),
        current: page,
        objects
    }
}

async function deleteObjects(deleter, component) {
    // #swagger.tags = ['Create/Delete']
    var count;
    
    try{
        count = await deleter.remove({ _component: component })
    }
    catch(err) {
        console.log(err)
    }
    
    var obj = {
        count,
        error: false,
        message: 'Done'
    }

    return obj
}

module.exports = {
    createObjects,
    searchObject,
    deleteObjects
}