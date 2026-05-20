const express = require('express')
const route = express.Router()
const assignmentsController = require('./assignments-controller')

module.exports = (app) => {
    app.use('/assignments', route)

    route.post('/', assignmentsController.createAssignment)
}