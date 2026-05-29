const express = require('express')
const route = express.Router()
const assignmentsController = require('./assignments-controller')
const authMiddleware = require('../../../core/middlewares/auth');

module.exports = (app) => {
    app.use('/assignments', route)

    route.post('/', assignmentsController.createAssignment)

    route.get('/pendingstatus', assignmentsController.getPendingStatusAssignments)

    route.post('/updatestatus/:id', assignmentsController.updateStatus)

    route.get('/schedule', authMiddleware, assignmentsController.getUserSchedule)

    route.get('/:roleId', assignmentsController.getUsersForRole)

}
