/**
 * Created by Ravindra on 12/25/2017.
 */

var schema = {
        name: {type: String},
        description: {type: String},
        category: {type: String}
    },
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoCompleteSchema = new Schema(schema),
    AutoCompleteSchemaModel = mongoose.model('autoComplete', autoCompleteSchema);

function AutoCompleteModel() {
    this.connectionModel = AutoCompleteSchemaModel;
}

AutoCompleteModel.prototype.search = function (params, callback) {
    this.connectionModel.find(params.search, callback).sort(params.filters.sorting).skip(params.paging.skip).limit(parseInt(params.paging.count, 10));
};
AutoCompleteModel.prototype.create = function (data, callback) {
    this.connectionModel.create(data, callback);
};
module.exports = AutoCompleteModel;