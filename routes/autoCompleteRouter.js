/**
 * Created by Ravindra on 12/25/2017.
 */

var express = require('express'),
    router = express.Router(),
    autoCompleteController = require('../controllers/autoCompleteController'),
    autoComplete = new autoCompleteController();


router.post('/', autoComplete.getAll.bind(autoComplete));

router.post('/post', autoComplete.create.bind(autoComplete));

module.exports = router;