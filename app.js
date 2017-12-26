/**
 * Created by Ravindra on 12/25/2017.
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    async = require('async'),
    portListen = "8080",
    mongoDbUri = "mongodb://localhost:27017/myproject";
async.apply(mongoose.connect(mongoDbUri, {
    useMongoClient: true
}));
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + mongoDbUri);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

app.use(bodyParser.json({limit: '1000mb', extended: true}));
// ROUTER
app.use('/v1', require('./routes'));
app.listen(portListen);

module.exports = app;