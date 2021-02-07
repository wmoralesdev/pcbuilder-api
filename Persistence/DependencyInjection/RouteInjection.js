const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('../../manual_swagger.json')

const UserRouter = require('../../Infrastructure/RouterUsers')
const ComponentRouter = require('../../Infrastructure/RouterComponents')

module.exports = function(app) {
    app.use('/', UserRouter)
    app.use('/', ComponentRouter)

    app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerFile, {
        swaggerOptions: {
            docExpansion: 'none'
        }
    }))

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        return res.status(404).json({error: true, message: "Not found"})
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        console.log(err)
    });


    return app
}