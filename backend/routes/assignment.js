var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({
        name: "Project 1",
        openDate: 1/1/18,
        closeDate: 1/2/18,
        description: "DESCRIPTION TEXT",
        requirements: "REQUIREMENT RANDOM TEXT",
        io: [
            {input: "EXAMPLE INPUT 1", output: "EXAMPLE OUTPUT 1" },
            {input: "EXAMPLE INPUT 2", output: "EXAMPLE OUTPUT 2" }
        ],
        tests: [
            {success: false, label: "EXAMPLE LABEL 1"},
            {success: true,  label: "EXAMPLE LABEL 2"}
        ]
    });
});

router.post('/', function(req, res, next) {
    const text = req.body.form;

    res.type('json');
    res.json({
        data: text
    });
});

module.exports = router;
