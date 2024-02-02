var path = require('path');
var express = require('express');
var router = express.Router();

var applicationController = require('../application/applicationController');


router.get('/character', function(req, res, next) {

    appController = new applicationController();
    html = appController.getAllCharacters();
    res.send(html);
});

router.get('/character/:id', function(req, res, next) {

    appController = new applicationController();
    html = appController.getCharacterById(req.params.id);
    res.send(html);
});














module.exports = router;