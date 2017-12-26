var chakram = require('chakram'),
    expect = chakram.expect,
    url = "http://localhost:8080/v1/auto/complete";

describe("AutoComplete", function () {
    var testSuite = this.title, response, dynamicId;
    this.timeout(30000);
    describe("Post_AutoComplete", function () {
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
                function autoComplete(k) {
                    expect(!result.body[k]._id).to.be.false;
                    expect(!result.body[k].name).to.be.false;
                    /*for checking name conatin the req name*/
                    expect(result.body[k].name).to.contain(testCaseData.input.name);
                }
                for (i = 0; i < result.body.length; i = i + 1) {
                    autoComplete(i);
                }
            });
        });
    });
});