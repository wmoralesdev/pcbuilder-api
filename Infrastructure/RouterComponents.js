var express = require('express');

const Authenticator = require('../Persistence/Authenticator')

const Case = require('../Application/ControllerCase');
const Cooler = require('../Application/ControllerCooler');
const Cpu = require('../Application/ControllerCPU');
const Gpu = require('../Application/ControllerGPU');
const Mobo = require('../Application/ControllerMobo');
const Psu = require('../Application/ControllerPowerSupply');
const Ram = require('../Application/ControllerRam');
const PcBuild = require('../Application/ControllerPcBuild');

var router = express.Router();

// Case
router.get('/case', Case.get)
// router.post('/case/createMany', Case.createMany)
// router.delete('/case/delete', Case.delete)

// Cooler
router.get('/cooler', Cooler.get)
// router.post('/cooler/createMany', Cooler.createMany)
// router.delete('/cooler/delete', Cooler.delete)

// Cpu
router.get('/cpu', Cpu.get)
// router.post('/cpu/createMany', Cpu.createMany)
// router.delete('/cpu/delete', Cpu.delete)

// Gpu
router.get('/gpu', Gpu.get)
// router.post('/gpu/createMany', Gpu.createMany)
// router.delete('/gpu/delete', Gpu.delete)

// Mobo
router.get('/mobo', Mobo.get)
// router.post('/mobo/createMany', Mobo.createMany)
// router.delete('/mobo/delete', Mobo.delete)

// Psu
router.get('/psu', Psu.get)
// router.post('/psu/createMany', Psu.createMany)
// router.delete('/psu/delete', Psu.delete)

// Ram
router.get('/ram', Ram.get)
// router.post('/ram/createMany', Ram.createMany)
// router.delete('/ram/delete', Ram.delete)

// PcBuild
router.get('/pcbuild/', Authenticator, PcBuild.getPcBuilds)
router.get('/pcbuild/build/:id', Authenticator, PcBuild.getSpecificBuild)
// router.post('/pcbuild/create', Authenticator, PcBuild.create)
// router.delete('/pcbuild/delete', Authenticator, PcBuild.deleteBuild)

module.exports = router;