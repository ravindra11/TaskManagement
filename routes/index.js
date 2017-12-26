/**
 * Created by Ravindra on 12/25/2017.
 */

var express = require('express'),
    router = express.Router();

router.use('/task/managements', require('./taskManagementRouter'));
router.use('/auto/complete', require('./autoCompleteRouter'));

module.exports = router;