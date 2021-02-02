var cors = require('cors')
var path = require('path')
var logger = require('morgan')
const express = require('express')
var createError = require('http-errors')
var cookieParser = require('cookie-parser')

var mongooseConnection = require('../../Infrastructure/MongoConnection')

module.exports = function (app) {
    app.set('view engine', 'pug')

    app.use(logger('dev'));
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    mongooseConnection()

    return app
}