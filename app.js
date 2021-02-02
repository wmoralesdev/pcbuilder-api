const express = require('express')

const RoutesInjection = require('./Persistence/DependencyInjection/RouteInjection')
const DependencyInjection = require('./Persistence/DependencyInjection/DependencyInjection')

var app = express()

app = DependencyInjection(app)
app = RoutesInjection(app)

module.exports = app;