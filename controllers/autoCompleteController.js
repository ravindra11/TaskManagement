/**
 * Created by Ravindra on 12/25/2017.
 */

var AutoCompleteModel = require('../models/autoCompleteModel'),
    CommonController = require('../utils/controllerUtil'),
    autoModel,
    commonUtils;

function AutoCompleteController() {
    autoModel = new AutoCompleteModel();
    commonUtils = new CommonController();
}

AutoCompleteController.prototype.getAll = function (req, res, next) {
    commonUtils.search(autoModel, req, res, next);
};
AutoCompleteController.prototype.create = function (req, res, next) {
    commonUtils.create(autoModel, req, res, next);
};

module.exports = AutoCompleteController;