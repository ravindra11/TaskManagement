/**
 * Created by Ravindra on 12/25/2017.
 */

var TaskManagementModel = require('../models/TaskManagementModel'),
    CommonController = require('../utils/controllerUtil'),
    tmModel,
    commonUtils;

function TaskManagementController() {
    tmModel = new TaskManagementModel();
    commonUtils = new CommonController();
}

TaskManagementController.prototype.getAll = function (req, res, next) {
    commonUtils.find(tmModel, req, res, next);
};
TaskManagementController.prototype.getById = function (req, res, next) {
    commonUtils.findOne(tmModel, req, res, next);
};
TaskManagementController.prototype.create = function (req, res, next) {
    commonUtils.create(tmModel, req, res, next);
};
TaskManagementController.prototype.update = function (req, res, next) {
    commonUtils.update(tmModel, req, res, next);
};
TaskManagementController.prototype.remove = function (req, res, next) {
    commonUtils.remove(tmModel, req, res, next);
};
TaskManagementController.prototype.search = function (req, res, next) {
    commonUtils.search(tmModel, req, res, next);
};

module.exports = TaskManagementController;