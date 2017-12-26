var mongoModelParams = require('./modelParameters');

function ControllerUtilFunction() {
}
ControllerUtilFunction.prototype.find = function (commonModel, req, res, next) {
    var params = mongoModelParams(req);
    commonModel.find(params, function (err, results) {
        if (err) {
            return next({status: 500, error: err});
        } else if (results.length <= 0) {
            return res.status(404).json({status: 404, message: 'Records Not Found'});
        }
        return res.status(200).json(results);
    });
};
ControllerUtilFunction.prototype.findOne = function (commonModel, req, res, next) {
    commonModel.findOne(req.params.id, function (err, results) {
        if (err) {
            return next({status: 500, error: err});
        } else if (!results) {
            return res.status(404).json({status: 404, message: 'Records Not Found'});
        }
        return res.status(200).json(results);
    });
};
ControllerUtilFunction.prototype.create = function (commonModel, req, res, next) {
    commonModel.create(req.body, function (err, result) {
        if (err) {
            return res.status(500).json({error: err, message: "please provide unique name"});
        }
        res.status(201).json(result);
    });
};
ControllerUtilFunction.prototype.update = function (commonModel, req, res, next) {
    commonModel.update(req.params.id, req.body, function (err, result) {
        if (err) {
            return next({status: 500, error: err});
        }
        res.status(200).json(result);
    });
};
ControllerUtilFunction.prototype.remove = function (commonModel, req, res, next) {
    commonModel.remove(req.params.id, function (err, data) {
        if (err) {
            return next({status: 500, error: err});
        }
        res.status(204).send(JSON.stringify({
            message: 'resource(s) deleted.'
        }));
    });
};

ControllerUtilFunction.prototype.search = function (commonModel, req, res, next) {
    var params = mongoModelParams(req);
    commonModel.search(params, function (err, results) {
        if (err) {
            return next({status: 500, error: err});
        } else if (results.length <= 0) {
            return res.status(200).json({status: 404, message: 'Records Not Found'});
        }
        res.status(200).json(results);
    });
};

module.exports = ControllerUtilFunction;