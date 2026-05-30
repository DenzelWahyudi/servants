const express = require('express')
const route = express.Router()
const assignmentsController = require('./assignments-controller')
const authMiddleware = require('../../../core/middlewares/auth');

module.exports = (app) => {
    app.use('/assignments', route)

    route.post('/', assignmentsController.createAssignment)

    route.get('/pendingstatus', assignmentsController.getPendingStatusAssignments)

    route.delete('/relieve', assignmentsController.relieveUser)

    route.put('/updatestatus/:id', assignmentsController.updateStatus)

    route.get('/schedule', authMiddleware, assignmentsController.getUserSchedule)

    route.get('/all', authMiddleware, assignmentsController.getAllUserAssignments)

    route.get('/:roleId', assignmentsController.getUsersForRole)

    route.get('/relieve/:roleId', assignmentsController.getUsersToRelieve)
}
