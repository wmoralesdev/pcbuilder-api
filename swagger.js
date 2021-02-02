const swagger = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpoints = ['./Infrastructure/RouterComponents.js',
    './Infrastructure/RouterUsers.js']

const doc = {
    host: "localhost:8080",
    tags: [
        {
            name: "Create/Delete",
            description: "Components creation or deletion (not going to use them)"
        },
        {
            name: "Read",
            description: "Query components from database"
        },
        {
            name: "PcBuild",
            description: "Endpoints for PcBuild Creation"
        }
    ],
    definitions: {
        Case: {
            name: "AZZA Iris 330",
            manufacturer: "AZZA",
            productionYear: 2020,
            price: 7000,
            powerConsumption: 0,

            type: 'ATX'
        },
        Cooler: {
            name: "NZXT Kraken 3500",
            manufacturer: "NZXT",
            productionYear: 2020,
            price: 14500,
            powerConsumption: 50,

            type: 'Water cooled'
        },
        Cpu: {
            name: "Ryzen 3 3100",
            manufacturer: "AMD",
            productionYear: 2018,
            price: 15000,
            powerConsumption: 50,

            frequency: "3.6GHz to 4.0 GHz",
            cores: 4,
            threads: 8,
            integratedGpu: false
        },
        Gpu: {
            name: "AsRock Phantom 8GB RX 5700 XT OC",
            manufacturer: "AsRock",
            productionYear: 2020,
            price: 56000,
            powerConsumption: 75,

            vram: 8,
            fans: 3
        },
        Mobo: {
            name: "Gigabyte B450M DHS3",
            manufacturer: "Gigabyte",
            productionYear: 2017,
            price: 9500,
            powerConsumption: 0,

            type: 'Micro ATX',
            compatibility: 'AMD',
            ramSockets: 4,
            pciePorts: 2
        },
        PcBuild: {
            owner: "6hnfa789rhkdsa8",
            name: "PC Build Upgrade 2020",

            case: "6hnfa789rhkdsa8",
            cooler: "6hnfa789rhkdsa8",
            cpu: "6hnfa789rhkdsa8",
            gpu: "6hnfa789rhkdsa8",
            mobo: "6hnfa789rhkdsa8",
            psu: "6hnfa789rhkdsa8",
            ram: ["6hnfa789rhkdsa8","6hnfa789rhkdsa8"]
        },
        Psu: {
            name: "XPG 550 Bronze 80+",
            manufacturer: "XPG",
            productionYear: 2018,
            price: 6900,
            powerConsumption: 0,

            capacity: 550
        },
        Ram: {
            name: "HyperX 8GB 3200MHz",
            manufacturer: "HyperX",
            productionYear: 2020,
            price: 7000,
            powerConsumption: 0,

            frequency: "3200 MHz",
            capacity: 8,
            type: "DDR4"
        },
        User: {
            username: "wmoralesdev",
            email: "walterrafael26@gmail.com",
            password: "adminadmin"
        }
    }
}

swagger(outputFile, endpoints, doc).then(() => {
    require('./Core/www')
})