/**
 * Created by Ravindra on 12/25/2017.
 */

var UserSchema = {
        name: {type: String, required: true},
        endDate: {type: Date},
        description: {type: String},
        creationTimestamp: {type: Date, default: Date.now},
        createdBy: {type: String, required: true, unique: true}
    },
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    TaskManagementSchema = new Schema(UserSchema),
    TaskManagementSchemaModel = mongoose.model('TaskManagement', TaskManagementSchema);

function TaskManagementModel() {
    this.connectionModel = TaskManagementSchemaModel;
}

TaskManagementModel.prototype.find = function (params, callback) {
    this.connectionModel.find(params.source, callback).sort(params.filters.sorting).skip(params.paging.skip).limit(parseInt(params.paging.count, 10));
};
TaskManagementModel.prototype.findOne = function (id, callback) {
    this.connectionModel.findOne({_id: id}, callback);
};
TaskManagementModel.prototype.create = function (data, callback) {
    this.connectionModel.create(data, callback);
};
TaskManagementModel.prototype.update = function (id, data, callback) {
    var conditions = {_id: id}, update = data, options = {multi: true};
    this.connectionModel.update(conditions, update, options, callback);
};
TaskManagementModel.prototype.remove = function (id, callback) {
    this.connectionModel.remove({_id: id}, callback);
};
TaskManagementModel.prototype.search = function (params, callback) {
    this.connectionModel.find(params.search, callback).sort(params.filters.sorting).skip(params.paging.skip).limit(parseInt(params.paging.count, 10));
};
module.exports = TaskManagementModel;