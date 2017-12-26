/**
 * Created by Ravindra on 12/27/2017.
 */

var chakram = require('chakram'),
    expect = chakram.expect,
    url = "http://localhost:8080/v1/task/managements";

describe("TaskManagement", function () {
    var testSuite = this.title, response, dynamicId;
    this.timeout(30000);
    describe("TaskManagement_Get", function () {
        var getCases = this.title;
        it("getAll_documents", function () {
            var testCase = this.test.title, data = require('./data/' + testSuite + '/' + getCases + '.json'), testCaseData = data[testSuite][testCase];
            this.timeout(30000);
            return chakram.get(url).then(function (result) {
                expect(result.response.statusCode).to.equal(testCaseData.expected.status);
                expect(result.response.headers['content-type']).to.equal(testCaseData.expected.headers['content-type']);
                expect(result.body).to.not.be.null;
                expect(result.body).to.not.be.undefined;
                expect(result.body.length).to.greaterThan(testCaseData.expected.count);
                dynamicId = result.body[0].id;
                function taskManagement(k) {
                    expect(!result.body[k]._id).to.be.false;
                    expect(!result.body[k].name).to.be.false;
                    expect(!result.body[k].endDate).to.be.false;
                    expect(!result.body[k].createdBy).to.be.false;
                    var date = new Date(Date.parse(result.body[k].creationTimestamp));
                    expect(date).to.be.an.object;
                }

                for (i = 0; i < result.body.length; i = i + 1) {
                    taskManagement(i);
                }
            });
        });
        it("Filtering_By_BeforeEndDate", function () {
            var testCase = this.test.title, data = require('./data/' + testSuite + '/' + getCases + '.json'), testCaseData = data[testSuite][testCase];
            this.timeout(30000);
            return chakram.get(url + "?beforeEndDate=" + testCaseData.input.date).then(function (result) {
                expect(result.response.statusCode).to.equal(testCaseData.expected.status);
                expect(result.response.headers['content-type']).to.equal(testCaseData.expected.headers['content-type']);
                expect(result.body).to.not.be.null;
                expect(result.body).to.not.be.undefined;

                function taskManagement(k) {
                    expect(!result.body[k]._id).to.be.false;
                    expect(!result.body[k].name).to.be.false;
                    expect(!result.body[k].endDate).to.be.false;
                    expect(!result.body[k].createdBy).to.be.false;

                    /*for checking endDate is before the req date*/

                    var date = new Date(Date.parse(result.body[k].endDate)),
                        reqstDate = new Date(Date.parse(testCaseData.input.date));
                    expect(date < reqstDate).to.be.true;
                }

                for (i = 0; i < result.body.length; i = i + 1) {
                    taskManagement(i);
                }
            });
        });
        it("Filtering_By_AfterEndDate", function () {
            var testCase = this.test.title, data = require('./data/' + testSuite + '/' + getCases + '.json'), testCaseData = data[testSuite][testCase];
            this.timeout(30000);
            return chakram.get(url + "?beforeEndDate=" + testCaseData.input.date).then(function (result) {
                expect(result.response.statusCode).to.equal(testCaseData.expected.status);
                expect(result.response.headers['content-type']).to.equal(testCaseData.expected.headers['content-type']);
                expect(result.body).to.not.be.null;
                expect(result.body).to.not.be.undefined;

                function taskManagement(k) {
                    expect(!result.body[k]._id).to.be.false;
                    expect(!result.body[k].name).to.be.false;
                    expect(!result.body[k].endDate).to.be.false;
                    expect(!result.body[k].createdBy).to.be.false;

                    /*for checking endDate is after the req date*/

                    var date = new Date(Date.parse(result.body[k].endDate)),
                        reqstDate = new Date(Date.parse(testCaseData.input.date));
                    expect(date > reqstDate).to.be.true;
                }

                for (i = 0; i < result.body.length; i = i + 1) {
                    taskManagement(i);
                }
            });
        });
        it("Filtering_By_createdAfterDate", function () {
            var testCase = this.test.title, data = require('./data/' + testSuite + '/' + getCases + '.json'), testCaseData = data[testSuite][testCase];
            this.timeout(30000);
            return chakram.get(url + "?beforeEndDate=" + testCaseData.input.date).then(function (result) {
                expect(result.response.statusCode).to.equal(testCaseData.expected.status);
                expect(result.response.headers['content-type']).to.equal(testCaseData.expected.headers['content-type']);
                expect(result.body).to.not.be.null;
                expect(result.body).to.not.be.undefined;

                function taskManagement(k) {
                    expect(!result.body[k]._id).to.be.false;
                    expect(!result.body[k].name).to.be.false;
                    expect(!result.body[k].endDate).to.be.false;
                    expect(!result.body[k].createdBy).to.be.false;

                    /*for checking creationTimestamp after the req date*/

                    var date = new Date(Date.parse(result.body[k].creationTimestamp)),
                        reqstDate = new Date(Date.parse(testCaseData.input.date));
                    expect(date > reqstDate).to.be.true;
                }

                for (i = 0; i < result.body.length; i = i + 1) {
                    taskManagement(i);
                }
            });
        });
    });
    describe("Post_Task_Management", function () {
        var postCases = this.title;
        this.timeout(30000);
        it("WITH_VALID_DATA", function () {
            var testCase = this.test.title, data = require('./data' + '/' + testSuite + '/' + postCases + '.json'), testCaseData = data[postCases][testCase];
            this.timeout(30000);
            response = chakram.post(url, testCaseData.input, {
                'Content-Type': 'application/json',
                json: true
            });
            return response.then(function (result) {
                expect(result.response.statusCode).to.equal(testCaseData.expected.statusCode);
                expect(result.response.headers['content-type']).to.equal(testCaseData.expected.headers['content-type']);
                expect(result.body).to.not.be.null;
                expect(result.body).to.not.be.undefined;
                expect(!result.body._id).to.be.false;
                dynamicId = result.body._id;
                expect(result.body.name).to.be.equal(testCaseData.input.name);
                var inputDate = new Date(testCaseData.input.endDate).toISOString(),
                    resultEndDate = new Date(result.body.endDate).toISOString();
                expect(resultEndDate).to.be.equal(inputDate);
                expect(result.body.createdBy).to.be.equal(testCaseData.input.createdBy);
            });
        });
    });
    describe("Update_Task_Management", function () {
        var updateCases = this.title;
        this.timeout(30000);
        it("WITH_VALID_DATA", function () {
            var testCase = this.test.title, data = require('./data' + '/' + testSuite + '/' + updateCases + '.json'), testCaseData = data[updateCases][testCase];
            this.timeout(30000);
            response = chakram.put(url + '/' + dynamicId, testCaseData.input, {
                'Content-Type': 'application/json',
                json: true
            });
            return response.then(function (result) {
                expect(result.response.statusCode).to.equal(testCaseData.expected.statusCode);
                expect(result.response.headers['content-type']).to.equal(testCaseData.expected.headers['content-type']);
                expect(result.body).to.not.be.null;
                expect(result.body).to.not.be.undefined;
                expect(result.body.nModified).to.be.equal(1);
            });
        });
    });
    describe("Delete_Task_Management", function () {
        it("WITH_VALID_Id", function () {
            this.timeout(30000);
            return chakram.delete(url + '/' + dynamicId, null, {
                json: false
            }).then(function (Result) {
                expect(Result.response.statusCode).to.equal(204);
                return chakram.get(url + '/' + dynamicId, {
                    json: false
                }).then(function (getResult) {
                    expect(getResult.response.statusCode).to.equal(404);
                });
            });
        });
    });
});

