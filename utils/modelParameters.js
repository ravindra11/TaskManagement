/**
 * Created by Ravindra on 12/25/2017.
 */

var _ = require("lodash");

function getMongoModelParams(req) {
    var modelParams = {}, body, sortObj, reqBody, skipCount, searchObj, pagingObj, sourceObj, sourceArr, searchArr, autoCompleteObj,
        pagingData = ['start', 'end', 'limit', 'page', 'count'],
        sourcedata = ['beforeEndDate', 'afterEndDate', 'createdAfterDate', 'createdBy', 'description', 'name'];
    modelParams.paging = {};
    modelParams.filters = {};
    modelParams.source = {};
    modelParams.search = {};
    modelParams.paging.count = 0;
    modelParams.paging.skip = 0;
    modelParams.filters.sorting = {$natural: -1};
    if (req.query) {
        body = req.query;
    }
    if (req.body) {
        reqBody = req.body;
    }

    sortObj = _.pick(body, ['sort']);

    if (sortObj && sortObj.sort) {
        modelParams.filters.sorting = [['name', -1]];
    }
    pagingObj = _.pick(body, pagingData);
    if (pagingObj) {
        if (pagingObj.page) {
            skipCount = 10 * pagingObj.page - 10;
            modelParams.paging.skip = skipCount;
            if (!pagingObj.count || !pagingObj.limit) {
                modelParams.paging.count = 10;
            }
        }
        if (pagingObj.count || pagingObj.limit) {
            if (pagingObj.count) {
                modelParams.paging.count = pagingObj.count;
            } else if (pagingObj.limit) {
                modelParams.paging.count = pagingObj.limit;
            }
        }
    }
    sourceObj = _.pick(body, sourcedata);

    if (sourceObj) {
        sourceArr = [];
        if (sourceObj.beforeEndDate) {
            sourceArr.push(['endDate', {
                "$lt": new Date(sourceObj.beforeEndDate)
            }]);
        }
        if (sourceObj.afterEndDate) {
            sourceArr.push(['endDate', {
                "$gte": new Date(sourceObj.afterEndDate)
            }]);
        }
        if (sourceObj.createdAfterDate) {
            sourceArr.push(['creationTimestamp', {
                "$gte": new Date(sourceObj.createdAfterDate)
            }]);
        }
        if (sourceObj.createdBy) {
            sourceArr.push(['createdBy', sourceObj.createdBy]);
        }
        modelParams.source = _.fromPairs(sourceArr);
    }
    searchObj = _.pick(body, sourcedata);
    autoCompleteObj = _.pick(reqBody, sourcedata);

    if (searchObj || autoCompleteObj) {
        searchArr = [];
        if (searchObj.description) {
            searchArr.push(['description', {$regex: new RegExp(searchObj.description, 'i')}]);
        }
        if (searchObj.name) {
            searchArr.push(['name', {$regex: new RegExp(searchObj.name, 'i')}]);
        }
        if (autoCompleteObj.name) {
            searchArr.push(['name', {$regex: new RegExp(autoCompleteObj.name, 'i')}]);
        }
        modelParams.search = _.fromPairs(searchArr);
    }
    return modelParams;
}
module.exports = getMongoModelParams;
