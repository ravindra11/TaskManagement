/**
 * Created by Ravindra on 12/25/2017.
 */

var express = require('express'),
    router = express.Router(),
    TaskManagementController = require('../controllers/taskManagementController'),
    tmc = new TaskManagementController();

router.get('/', tmc.getAll.bind(tmc));

router.get('/search', tmc.search.bind(tmc));

router.get('/:id', tmc.getById.bind(tmc));

router.post('/', tmc.create.bind(tmc));

router.put('/:id', tmc.update.bind(tmc));

router.delete('/:id', tmc.remove.bind(tmc));

module.exports = router;